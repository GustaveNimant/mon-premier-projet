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
	const counter = Observable.interval(1000); /* http://reactivex.io/documentation/operators/interval.html */
	this.counterSubscription = counter.subscribe(
	    (value:number) => {
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
