import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './commands/social/social.component';
import { UtilitiesComponent } from './commands/utilities/utilities.component';
import { LoggedInComponent } from './nav/logged-in/logged-in.component';
import { SettingsComponent } from './commands/settings/settings.component';
import { ModerationComponent } from './commands/moderation/moderation.component';
import { FunComponent } from './commands/fun/fun.component';
import { CommandsIndexComponent } from './commands/commands-index/commands-index.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { NgForm } from '@angular/forms';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatesComponent } from './updates/updates.component';
import { DashboardProfileComponent } from './dashboard/profile/dashboard-profile.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import * as Sentry from '@sentry/browser';
import { DashboardGuildsComponent } from './dashboard/guilds/dashboard-guilds.component';
import { DashboardGuildManageComponent } from './dashboard/manage/dashboard-guild-manage.component';
import { MarabouComponent } from './marabou/marabou.component';
import { MaradashComponent } from './marabou/maradash/maradash.component';
import { InterviewsComponent } from './marabou/interviews/interviews.component';
import { NgxLinkifyOptions } from 'ngx-linkifyjs';
import { MarabouNavComponent } from './marabou/marabou-nav/marabou-nav.component';
import { PresenceComponent } from './presence/presence.component';
import { PresenceFrontendComponent } from './presence/presence-frontend/presence-frontend.component';
import { PresenceManagerComponent } from './presence/presence-manager/presence-manager.component';
import { ViewProfileComponent } from './presence/presence-manager/view-profile/view-profile.component';
import { VerifyComponent } from './verify/verify.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CloverComponent } from './clover/clover.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { EmojifyModule, EmojifyPipe } from 'angular-emojify';
import { SideNavGuildsComponent } from './side-nav-guilds/side-nav-guilds.component';
import { SetHomeComponent } from './dashboard/settings/home/set-home.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { PrefixComponent } from './dashboard/settings/prefix/prefix.component';
import { WelcomerComponent } from './dashboard/settings/welcomer/welcomer.component';
import { LoggingComponent } from './dashboard/settings/logging/logging.component';
import { ModeratorComponent } from './dashboard/settings/moderator/moderator.component';
import { ErrorComponent } from './error/error.component';
import { CloverNavComponent } from './clover/clover-nav/clover-nav.component';
import { RobloxComponent } from './dashboard/settings/roblox/roblox.component';
import { CloverUserComponent } from './clover/clover-user/clover-user.component';
import { CloverUnavComponent } from './clover/clover-user/clover-unav/clover-unav.component';
import { ClProfileComponent } from './clover/clover-user/components/cl-profile/cl-profile.component';
import { ClDataComponent } from './clover/clover-user/components/cl-data/cl-data.component';
import { ClActivityComponent } from './clover/clover-user/components/cl-activity/cl-activity.component';

const options: NgxLinkifyOptions = {
  attributes: null,
  className: 'linkify',
  defaultProtocol: 'http',
  events: null,
  format(value, type) {
    return value;
  },
  formatHref(href, type) {
    return href;
  },
  ignoreTags: [],
  nl2br: false,
  tagName: 'a',
  target: {
    url: '_blank'
  },
  validate: true
};

Sentry.init({
  dsn: 'https://d1da4184595a45159753da7531546696@sentry.io/1488124'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureEvent(error.originalError || error);
    // Sentry.showReportDialog({eventId});
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SocialComponent,
    UtilitiesComponent,
    LoggedInComponent,
    SettingsComponent,
    ModerationComponent,
    FunComponent,
    CommandsIndexComponent,
    DashboardComponent,
    UpdatesComponent,
    DashboardProfileComponent,
    DashboardGuildsComponent,
    DashboardGuildManageComponent,
    MarabouComponent,
    MaradashComponent,
    InterviewsComponent,
    MarabouNavComponent,
    PresenceComponent,
    PresenceFrontendComponent,
    PresenceManagerComponent,
    ViewProfileComponent,
    VerifyComponent,
    CheckoutComponent,
    ThankYouComponent,
    CloverComponent,
    SideNavComponent,
    SideNavGuildsComponent,
    SetHomeComponent,
    StatsComponent,
    PrefixComponent,
    WelcomerComponent,
    LoggingComponent,
    ModeratorComponent,
    ErrorComponent,
    CloverNavComponent,
    RobloxComponent,
    CloverUserComponent,
    CloverUnavComponent,
    ClProfileComponent,
    ClDataComponent,
    ClActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    HttpClientModule,
    AngularFirestoreModule,
    ColorPickerModule,
    NgxLinkifyjsModule.forRoot(),
    FormsModule,
    BrowserModule,
    EmojifyModule
  ],
  providers: [
    EmojifyPipe,
    {provide: ErrorHandler, useClass: SentryErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
