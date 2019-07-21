import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';

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
		resolve(date);
	    }, 2000
	);
    });

    les_appareils : any[];

    constructor(private appareilService : AppareilService) {
	setTimeout(
	    () => {
		this.isAuth = true;
	    }, 4000
	);
    }

    ngOnInit () { /* Après constructor. Avant les autres méthodes */
	this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
	    (des_appareils: any[]) => {
		this.les_appareils = des_appareils;
	    }
	);
	/* émet la copie des appareils */
	this.appareilService.emitAppareilSubject(); 
    }
    
    onAllumer() {
	this.appareilService.switchOnAll();
    }
    
    onEteindre() {
	if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
	    this.appareilService.switchOffAll();
	} else {
	    return null;
	} 
    }

    onSauvegarder() {
	this.appareilService.saveAppareilsToServer();
    }
    
    onRecuperer() {
	this.appareilService.getAppareilsFromServer();
    }
}
