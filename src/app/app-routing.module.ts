import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {RepertoireComponent} from './repertoire/repertoire.component';
import {CreateScreeningComponent} from './create-screening/create-screening.component';
import {EditScreeningComponent} from './edit-screening/edit-screening.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/details/:id', component: MovieDetailsComponent},
  {path: 'movies/add', component: CreateMovieComponent},
  {path: 'movies/edit/:id', component: EditMovieComponent},
  {path: 'repertoire', component: RepertoireComponent},
  {path: 'repertoire/add', component: CreateScreeningComponent},
  {path: 'repertoire/edit/:id', component: EditScreeningComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
