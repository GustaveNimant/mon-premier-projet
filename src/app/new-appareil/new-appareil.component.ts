import { AppareilService } from '../services/appareil.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Un_appareil } from '../models/Un_appareil.model';

@Component({
    selector: 'app-new-appareil',
    templateUrl: './new-appareil.component.html',
    styleUrls: ['./new-appareil.component.scss']
})

export class NewAppareilComponent implements OnInit {

    public appareilForm: FormGroup;
    name: string = 'Appareil';
    status: string = 'Statut';

    constructor(private formBuilder: FormBuilder,
		private appareilService: AppareilService,
		private router: Router
    ){};

    ngOnInit() {
        this.appareilForm = this.formBuilder.group({
            id: 0,
            name: [null, Validators.required],
            status: [null, Validators.required]
        });
    }

    onSubmit() {
//	const appareil = new Un_appareil();
	this.name = this.appareilForm.get('name').value;
	this.status = this.appareilForm.get('status').value;
	console.log('Dans onSubmit name', this.name,' status', this.status);
	this.appareilService.addOne(this.name, this.status);
	this.router.navigate(['/']);
    }
}
