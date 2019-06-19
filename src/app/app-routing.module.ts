import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './commands/social/social.component';
import { UtilitiesComponent } from './commands/utilities/utilities.component';
import { SettingsComponent } from './commands/settings/settings.component';
import { ModerationComponent } from './commands/moderation/moderation.component';
import { FunComponent } from './commands/fun/fun.component';
import { CommandsIndexComponent } from './commands/commands-index/commands-index.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'commands/social', component: SocialComponent },
  { path: 'commands', component: CommandsIndexComponent },
  { path: 'commands/utilities', component: UtilitiesComponent },
  { path: 'commands/settings', component: SettingsComponent },
  { path: 'commands/moderation', component: ModerationComponent },
  { path: 'commands/fun', component: FunComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
