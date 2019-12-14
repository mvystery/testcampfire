const functions = require("firebase-functions");

const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey.json");
const fireapp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://campfire-640d7.firebaseio.com",
});

const DiscordOauth2 = require("cf-discord-oauth2");
const oauth = new DiscordOauth2();

const db = admin.firestore();
const dbServers = db.collection('servers');

exports.login = functions.https.onRequest(async (req, res) => {
    const reqCode = req.query.code;

    oauth
        .tokenRequest({
            clientId: "579415199979798539",
            clientSecret: functions.config().discord.secret,
            grantType: "authorization_code",
            // tslint:disable-next-line: object-literal-sort-keys
            code: reqCode,
            redirectUri: "https://us-central1-campfire-640d7.cloudfunctions.net/login",
            scope: "identify guilds",
        }).then(data => {
            const token = data.access_token;

            oauth.getUser(token).then(userData => {
                admin.auth().createCustomToken(userData.id).then(fireToken => {
                    return res.send(
                        // tslint:disable-next-line: max-line-length
                        `<script>window.opener.postMessage({ token: "${token}", auth: "${fireToken}" }, "*"); setTimeout(function() { window.close(); }, 500);</script>`,
                    );
                }).catch(err => {
                    res.send("There was an error");
                    throw err;
                });

                return null;
            }).catch(err => {
                res.send("There was an error");
                throw err;
            });

            return null;
        }).catch(err => {
            res.send("There was an error");
            throw err;
        });
});

exports.guilds = functions.https.onCall((data, context) => {
    return oauth.getUserGuilds(data.auth).then(guildData => {
        // tslint:disable-next-line: no-bitwise
        const result = guildData.filter(item => (item.permissions & 0x20) === 0x20);
        return result;
    }).catch(err => {
        throw err;
    });
});

exports.guildData = functions.https.onCall(async (data, context) => {
    const serverId = data.server;
    const authCode = data.auth;

    return oauth.getUserGuilds(data.auth).then(guildData => {
        // tslint:disable-next-line: no-bitwise
        const result = guildData.filter(item => (item.permissions & 0x20) === 0x20);
        return result;
    }).catch(err => {
        throw err;
    });
});

exports.userData = functions.https.onCall(async (data, context) => {
    const authCode = data.auth;

    return oauth.getUser(data.auth).then(userData => {
        return ({
            auth: true,
            avatar: userData.avatar,
            discriminator: userData.discriminator,
            id: userData.id,
            username: userData.username,
        });
    }).catch(err => {
        throw err;
    });
});

exports.welcome = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Authorization");

    const authCode = req.header("Authorization");
    let serverId = req.query.server;

    if (authCode) {
        return oauth.getUserGuilds(authCode).then(guildData => {
            return guildData.map(mapped => {
                // tslint:disable-next-line: no-bitwise
                if (mapped.id === serverId && (mapped.permissions & 0x20) === 0x20) {
                    dbServers.doc(serverId).get().then(doc => {
                        if (doc.exists) {
                            if (doc.data().postsWelcomes === true) {
                                return res.json({
                                    auth: true,
                                    exists: true,
                                    postsWelcomes: true,
                                    welcomeInfo: doc.data().welcomeInfo,
                                });
                            } else {
                                return res.json({
                                    auth: true,
                                    exists: true,
                                    postsWelcomes: false,
                                });
                            }
                        } else {
                            return res.json({
                                auth: true,
                                exists: false,
                                postsWelcomes: false,
                            });
                        }
                    }).catch(err => {
                        throw err;
                    });
                }
            });
        }).catch(err => {
            throw err;
        });
    } else {
        return res.json({ auth: false, reason: "No Auth Code" });
    }
});

exports.disableWelcome = functions.https.onCall(async (data, context) => {
    const authCode = data.auth;
    const serverId = data.server;

    return oauth.getUserGuilds(data.auth).then(guildData => {
        // tslint:disable-next-line: no-bitwise
        const guild = guildData.find(x => (x.id === serverId) && (x.permissions & 0x20) === 0x20);
        if (guild !== null) {
            dbServers.doc(serverId).update({
                postsWelcomes: false,
            });

            return({success: true});
        } else {
            return({success: false});
        }
    }).catch(err => {
        throw err;
    });
});

exports.enableWelcome = functions.https.onCall(async (data, context) => {
    const authCode = data.auth;
    const serverId = data.server;

    return oauth.getUserGuilds(data.auth).then(guildData => {
        // tslint:disable-next-line: no-bitwise
        const guild = guildData.find(x => (x.id === serverId) && (x.permissions & 0x20) === 0x20);
        if (guild !== null) {
            dbServers.doc(serverId).update({
                postsWelcomes: true,
                welcomeInfo: {
                    welcomeChannelName: "general",
                    welcomeMessage: "$user$ just joined $server$",
                },
            });

            return({success: true});
        } else {
            return({success: false});
        }
    }).catch(err => {
        throw err;
    });
});
