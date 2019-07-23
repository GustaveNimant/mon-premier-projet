import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { RouterModule, Routes } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HttpClientModule } from '@angular/common/http';
import { NewAppareilComponent } from './new-appareil/new-appareil.component';

const appRoutes: Routes = [
    { path: 'appareils', canActivate:[AuthGuard], component: AppareilViewComponent },
    { path: 'appareils/:id', canActivate:[AuthGuard], component: SingleAppareilComponent },
    { path: 'new-appareil', component: NewAppareilComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'not-found', component: FourOhFourComponent },  
    { path: '', component: AppareilViewComponent },
    { path: '**', redirectTo: '/not-found' } /* terminal */
];

@NgModule({
    declarations: [
	AppComponent,
	MonPremierComponent,
	AppareilComponent,
	AuthComponent,
	AppareilViewComponent,
	SingleAppareilComponent,
	FourOhFourComponent,
	NewAppareilComponent
    ],
    imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule,
	RouterModule.forRoot(appRoutes)
    ],
    providers: [AppareilService,
		AuthGuard,
		AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
