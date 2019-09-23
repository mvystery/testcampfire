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

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgForm, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatesComponent } from './updates/updates.component';
import { DashboardProfileComponent } from './dashboard/dashboard-profile/dashboard-profile.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import * as Sentry from '@sentry/browser';
import { DashboardGuildsComponent } from './dashboard/dashboard-guilds/dashboard-guilds.component';
import { DashboardGuildManageComponent } from './dashboard/dashboard-guild-manage/dashboard-guild-manage.component';
import { SettingsHandlerComponent } from './dashboard/dashboard-guild-manage/settings-handler/settings-handler.component';
import { SetPrefixComponent } from './dashboard/dashboard-guild-manage/settings-handler/set-prefix/set-prefix.component';
import { SetWelcomerComponent } from './dashboard/dashboard-guild-manage/settings-handler/set-welcomer/set-welcomer.component';
import { SetRobloxComponent } from './dashboard/dashboard-guild-manage/settings-handler/set-roblox/set-roblox.component';
import { MarabouComponent } from './marabou/marabou.component';
import { MaradashComponent } from './marabou/maradash/maradash.component';
import { InterviewsComponent } from './marabou/interviews/interviews.component';
import { NgxLinkifyOptions } from 'ngx-linkifyjs';

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
    SettingsHandlerComponent,
    SetPrefixComponent,
    SetWelcomerComponent,
    SetRobloxComponent,
    MarabouComponent,
    MaradashComponent,
    InterviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFirestoreModule,
    ColorPickerModule,
    NgxLinkifyjsModule.forRoot(),
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
