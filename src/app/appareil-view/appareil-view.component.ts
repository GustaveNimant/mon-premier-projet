import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'app-appareil-view',
    templateUrl: './appareil-view.component.html',
    styleUrls: ['./appareil-view.component.scss']
})

export class AppareilViewComponent implements OnInit {

    isAuth = false;
    appareilSubscription: Subscription;

    lastUpdate = new Promise((resolve, reject) => {
	const date = new Date();

	setTimeout(
	    () => {
		console.log('Dans lastUpdate date est', date);
		resolve(date);
	    },
	    2000
	);
    });

    les_appareils : any[];

    constructor(private appareilService : AppareilService,
		private router: Router) {
	console.log('Entrée dans constructor');
	setTimeout(
	    () => {
		this.isAuth = true;
	    },
	    4000
	);
    }

    ngOnInit () { /* Après constructor. Avant les autres méthodes */
	console.log('Entrée dans ngOnInit');
	this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
	    (des_appareils: any[]) => {
		this.les_appareils = des_appareils;
	    }
	);
	/* émet la copie des appareils */
	this.appareilService.emitAppareilSubject(); 
    }
    
    onAllumer() {
	console.log('Entrée dans onAllumer');
	this.appareilService.switchOnAll();
    }
    
    onEteindre() {
	console.log('Entrée dans onEteindre');
	if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
	    this.appareilService.switchOffAll();
	} else {
	    return null;
	} 
    }

    onSauvegarder() {
	console.log('Entrée dans onSauvegarder');
	this.appareilService.saveAppareilsToServer();
    }
    
    onRecuperer() {
	console.log('Entrée dans onRecuperer');
	this.appareilService.getAppareilsFromServer();
    }

    onCreer() {
	console.log('Entrée dans onCreer');
	this.router.navigate(['/new-appareil']);
    }
}
