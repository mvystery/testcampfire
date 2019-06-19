import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './commands/social/social.component';
import { UtilitiesComponent } from './commands/utilities/utilities.component';
import { LoggedInComponent } from './nav/logged-in/logged-in.component';
import { SettingsComponent } from './commands/settings/settings.component';
import { ModerationComponent } from './commands/moderation/moderation.component';
import { FunComponent } from './commands/fun/fun.component';

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
    FunComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
