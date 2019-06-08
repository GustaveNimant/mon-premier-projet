import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-single-appareil',
    templateUrl: './single-appareil.component.html',
    styleUrls: ['./single-appareil.component.scss']
})

export class SingleAppareilComponent implements OnInit {

    name: string = 'Appareil';
    status: string = 'Statut';

    constructor(private appareilService: AppareilService,
		private route: ActivatedRoute) { }

    ngOnInit() {
	this.name = this.route.snapshot.params['id'];/* récupérer l'id de l'appareil courant */
    }
}
