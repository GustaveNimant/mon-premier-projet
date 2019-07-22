import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

    secondes: number;
    counterSubscription: Subscription;

    constructor (){}

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	/* http://reactivex.io/documentation/operators/interval.html */
	let counter = Observable.interval(5000); 
	this.counterSubscription = counter.subscribe(
	    (value:number) => {
		console.log('Dans ngOnInit value est', value);
		this.secondes = value;
	    },
	    (error:any) => {
		console.log('Oh-oh, erreur : ' + error);
	    },
	    () => {
		console.log('Observable complete!');
	    }
	);
    }

    ngOnDestroy() { /* déclenché quand le component est détruit */
	this.counterSubscription.unsubscribe();
    }
}
