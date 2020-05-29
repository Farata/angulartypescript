import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      [{path: '', redirectTo: 'login', pathMatch: 'full'},
       {path: 'login', component: LoginComponent},
       {path: 'home', component: HomeComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
