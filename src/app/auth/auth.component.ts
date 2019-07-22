import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    authStatus: boolean;

    constructor(private authService: AuthService,
		private router: Router)
		{ }

    ngOnInit() {
	console.log('Entrée dans onOnInit avec authStatus', this.authStatus);
	this.authStatus = this.authService.isAuth;
    }

    onSignIn() {
	console.log('Entrée dans onSingIn avec authService', this.authService);
	this.authService.signIn()
	    .then( /* asynchrone Promise */
		   (value) => {
		       console.log('onSignInp value est', value);
		       this.authStatus = this.authService.isAuth;
		       this.router.navigate(['appareils']); /* navigation vers /appareils */
		   }
	    );
    }
    
    onSignOut() {
	this.authService.signOut();
	this.authStatus = this.authService.isAuth;
    }
    
}
