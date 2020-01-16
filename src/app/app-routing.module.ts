import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './commands/social/social.component';
import { UtilitiesComponent } from './commands/utilities/utilities.component';
import { SettingsComponent } from './commands/settings/settings.component';
import { ModerationComponent } from './commands/moderation/moderation.component';
import { FunComponent } from './commands/fun/fun.component';
import { CommandsIndexComponent } from './commands/commands-index/commands-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProfileComponent } from './dashboard/profile/dashboard-profile.component';
import { DashboardGuildsComponent } from './dashboard/guilds/dashboard-guilds.component';
import { DashboardGuildManageComponent } from './dashboard/manage/dashboard-guild-manage.component';
import { MarabouComponent } from './marabou/marabou.component';
import { MaradashComponent } from './marabou/maradash/maradash.component';
import { InterviewsComponent } from './marabou/interviews/interviews.component';
import { PresenceComponent } from './presence/presence.component';
import { PresenceFrontendComponent } from './presence/presence-frontend/presence-frontend.component';
import { PresenceManagerComponent } from './presence/presence-manager/presence-manager.component';
import { ViewProfileComponent } from './presence/presence-manager/view-profile/view-profile.component';
import { VerifyComponent } from './verify/verify.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CloverComponent } from './clover/clover.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { ErrorComponent } from './error/error.component';
import { CloverUserComponent } from './clover/clover-user/clover-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'commands/social', component: SocialComponent },
  { path: 'commands', component: CommandsIndexComponent },
  { path: 'commands/utilities', component: UtilitiesComponent },
  { path: 'commands/settings', component: SettingsComponent },
  { path: 'commands/moderation', component: ModerationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/profile', component: DashboardProfileComponent },
  { path: 'dashboard/stats', component: StatsComponent },
  { path: 'dashboard/guilds', component: DashboardGuildsComponent },
  { path: 'commands/fun', component: FunComponent },
  { path: 'dashboard/guilds/:id', component: DashboardGuildManageComponent },
  // { path: 'marabou', component: MarabouComponent },
  // { path: 'marabou/maradash', component: MaradashComponent },
  { path: 'marabou/interviews', component: InterviewsComponent },
  { path: 'presence', component: PresenceComponent },
  { path: 'presence/:id', component: PresenceFrontendComponent },
  { path: 'presence/:id/manage', component: PresenceManagerComponent },
  { path: 'presence/:id/manage/:userId', component: ViewProfileComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'clover', component: CloverComponent },
  { path: 'clover/user/:id', component: CloverUserComponent },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
