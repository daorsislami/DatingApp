import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
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
      {path: 'members/:username', component: MemberDetailComponent}, // /:id each of our members is gonna have a root parameter e.g. member/2
      {path: 'lists', component: ListsComponent}, 
      {path: 'messages', component: MessagesComponent}, 
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}, // wild card routes, if user typed something that didn't match inside our root configuration 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
