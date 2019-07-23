import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AppareilService {

    appareilsSubject = new Subject<any[]>();
    
    private quatre_appareils = [
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
	},
	{
	    id: 4,
	    name: 'Lampadaire',
	    status: 'allumé'
	}
    ];

    constructor(private httpClient: HttpClient) { } /* injecté */

    emitAppareilSubject() { /* émet la liste des quatre_appareils */
	this.appareilsSubject.next(this.quatre_appareils.slice());
    }
    
    getAppareilAll() {
	const appareils = this.quatre_appareils.slice();
	this.emitAppareilSubject();
    }

    getAppareilById(id: number) {
	const appareil = this.quatre_appareils.find(
	    (app_o) => {
		return app_o.id === id;
	    }
	);
	return appareil;
    }
    
    switchOnAll() {
	for(let an_appareil of this.quatre_appareils) {
	    an_appareil.status = 'allumé';
	}
	this.emitAppareilSubject();
    }
    
    switchOffAll() {
	for(let an_appareil of this.quatre_appareils) {
	    an_appareil.status = 'éteint';
	}
	this.emitAppareilSubject();
    }
    
    switchOnOne(i: number) {
	this.quatre_appareils[i].status = 'allumé';
	this.emitAppareilSubject();
    }
    
    switchOffOne(i: number) {
	this.quatre_appareils[i].status = 'éteint';
	this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
	this.httpClient
	    .put('https://les-appareils.firebaseio.com/appareils.json', this.quatre_appareils)
	/* put : écrase le contenu */
	/* post : ajoute un nouvel enregistrement */
	    .subscribe( /* réaction à la réponse du serveur */
			() => {
		    console.log('Enregistrement terminé !');
		},
		(error) => {
		    console.log('saveAppareilsToServer Erreur ! : ' + error);
		}
	    );
    }
    
    getAppareilsFromServer() {
	this.httpClient
	    .get<any[]>('https://les-appareils.firebaseio.com/appareils.json')
		.subscribe(
		    (a_response) => {
			this.quatre_appareils = a_response;
			this.emitAppareilSubject();
		    },
		    (an_error) => {
			console.log('getAppareilsFromServer Erreur ! : ' + an_error);
		    },
		    () => {
			console.log('getAppareilsFromServer fait !');
		    }
		);
    }

    deleteOne(i: number) {
	console.log('Entrée dans deleteOne avec i',i);
	this.quatre_appareils.splice(i,1);
	console.log('Dans deleteOne quatre_appareils ', this.quatre_appareils);
        this.saveAppareilsToServer();
	this.getAppareilsFromServer();
    }

    addOne(name:string, status:string) {
	console.log('Entrée dans addOne');
        
	this.quatre_appareils.push ({id:this.quatre_appareils.length +1, name:name, status:status});
	console.log('Dans addOne quatre_appareils ', this.quatre_appareils);
        this.saveAppareilsToServer();
	this.getAppareilsFromServer();
    }
}    
