import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

// in this array we'll provide to provide the routes that we tell Angular about
// each and one of these routes is gonna be an object
const routes: Routes = [
  {path: '', component: HomeComponent}, // if someone goes to https://localhost:4200 then this is gonna be loaded
  
  // all of our children are covered by this single guard
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]}, 
      {path: 'members/:id', component: MemberDetailComponent}, // /:id each of our members is gonna have a root parameter e.g. member/2
      {path: 'lists', component: ListsComponent}, 
      {path: 'messages', component: MessagesComponent}, 
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'}, // wild card routes, if user typed something that didn't match inside our root configuration 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
