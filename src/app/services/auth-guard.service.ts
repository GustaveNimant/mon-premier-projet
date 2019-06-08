import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
		private router: Router) { }
    
    canActivate( /* guard */
	route: ActivatedRouteSnapshot, /* arguments */
	state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean { /* resultat */
        if(this.authService.isAuth) { 
	    return true;
	} else {
	    this.router.navigate(['/auth']); /* Redirection vers la page d'authentification*/
	}
    }
}
