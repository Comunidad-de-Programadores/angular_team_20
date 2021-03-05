import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// forms
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CopyrightComponent } from './pages/copyright/copyright.component';
import { TermsprivacyComponent } from './pages/termsprivacy/termsprivacy.component';
import { RouterModule } from '@angular/router';
import { VerificationEmailComponent } from './pages/utils/verification-email/verification-email.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {TimeService} from './services/time.service';

import {SponsorsComponent} from './pages/section/sponsor/sponsors/sponsors.component'
import {ComunidadesComponent} from './pages/section/comunidad/comunidades/comunidades.component'
import {CounterComponent} from './pages/section/counter/counter/counter.component'
import {CoursesComponent} from './pages/section/course/courses/courses.component'
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CopyrightComponent,
    TermsprivacyComponent,
    VerificationEmailComponent,
    ProfileComponent,
    SponsorsComponent,
    ComunidadesComponent,
    CounterComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  entryComponents: [
    SponsorsComponent,
    ComunidadesComponent,
    CounterComponent,
    CoursesComponent
  ],
  providers: [ TimeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
