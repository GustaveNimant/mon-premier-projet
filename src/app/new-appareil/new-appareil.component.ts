import { Component, OnDestroy, OnInit } from '@angular/core';
import { Un_appareil } from '../models/Un_appareil.model';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-appareil',
    templateUrl: './new-appareil.component.html',
    styleUrls: ['./new-appareil.component.scss']
})

export class NewAppareilComponent implements OnInit {

    public appareilForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
		private appareilService: AppareilService,
		private router: Router
    ){}

    ngOnInit() {
        this.appareilForm = this.formBuilder.group({
            id: 0,
            name: [null, Validators.required],
            status: [null, Validators.required]
        });

    }

    onSubmit() {
	const appareil = new Un_appareil();
	appareil.name = this.appareilForm.get('name').value;
	appareil.status = this.appareilForm.get('status').value;

	this.appareilService.addOne(appareil.name, appareil.status)
    }
}
