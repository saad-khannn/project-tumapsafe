import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { HelpComponent } from './help/help.component';

import { HomeComponent } from './home/home.component';

import { SignUpComponent } from './sign-up/sign-up.component';



const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'help', component: HelpComponent},
  {path: '', component: HomeComponent},
  {path: 'signUp', component: SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
