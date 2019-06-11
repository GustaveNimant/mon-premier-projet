import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AppareilService {

    appareilsSubject = new Subject<any[]>();
    
    private appareils = [
	{
	    id: 1,
	    name: 'Machine à laver',
	    status: 'éteint'
	},
	{
	    id: 2,
	    name: 'Frigo',
	    status: 'allumé'
	},
	{
	    id: 3,
	    name: 'Ordinateur',
	    status: 'éteint'
	}
    ];

    constructor(private httpClient: HttpClient) { } /* injecté */

    emitAppareilSubject() { /* émet la liste des appareils */
	this.appareilsSubject.next(this.appareils.slice());
    }
    
    getAppareilById(id: number) {
	const appareil = this.appareils.find(
	    (app_o) => {
		return app_o.id === id;
	    }
	);
	return appareil;
    }
    
    switchOnAll() {
	for(let an_appareil of this.appareils) {
	    an_appareil.status = 'allumé';
	}
	this.emitAppareilSubject();
    }
    
    switchOffAll() {
	for(let an_appareil of this.appareils) {
	    an_appareil.status = 'éteint';
	}
	this.emitAppareilSubject();
    }
    
    switchOnOne(i: number) {
	this.appareils[i].status = 'allumé';
	this.emitAppareilSubject();
    }
    
    switchOffOne(i: number) {
	this.appareils[i].status = 'éteint';
	this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
	
	this.httpClient
	    .post('https://les-appareils.firebaseio.com/appareils.json', this.appareils)
	    .subscribe( /* réaction à la réponse du serveur */
		() => {
		    console.log('Enregistrement terminé !');
		},
		(error) => {
		    console.log('saveAppareilsToServer Erreur ! : ' + error);
		}
	    );
	
    }
}
