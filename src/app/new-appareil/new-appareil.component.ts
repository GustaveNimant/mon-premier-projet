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
	const name = this.appareilForm.get('name').value;
	const status = this.appareilForm.get('status').value;
	console.log('Dans onSubmit name',name,' status', status);
	this.appareilService.addOne(name, status);
	this.router.navigate(['/']);
    }
}
