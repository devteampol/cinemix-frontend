import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';

import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {RepertoireComponent} from './repertoire/repertoire.component';
import {CreateScreeningComponent} from './create-screening/create-screening.component';
import {EditScreeningComponent} from './edit-screening/edit-screening.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CreateMovieComponent,
    MovieDetailsComponent,
    MovieListComponent,
    EditMovieComponent,
    ConfirmEqualValidatorDirective,
    RepertoireComponent,
    CreateScreeningComponent,
    EditScreeningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [authInterceptorProviders, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
