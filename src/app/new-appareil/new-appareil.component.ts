import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-new-appareil',
    templateUrl: './new-appareil.component.html',
    styleUrls: ['./new-appareil.component.scss']
})

export class NewAppareilComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onSubmit() {
	this.loading = true;

	const appareil = new Un_appareil();
	appareil.titre = this.appareilForm.get('titre').value;
	appareil.contenu = this.appareilForm.get('contenu').value;
	appareil.noteMoyenne = this.appareilForm.get('noteMoyenne').value;
	appareil.shasum = this.appareilForm.get('shasum').value;
	appareil._id = new Date().getTime().toString();
	appareil.participantId = this.participantId;

	this.appareilsService.createNewAppareil(appareil)
	    .then(
		() => {
		    this.appareilForm.reset();
		    this.loading = false;
		    switch (this.part) {
			case 1:
			case 2:
			    this.router.navigate(['/part-one/les-appareils']);
			    break;
			case 3:
			    this.router.navigate(['/part-three/les-appareils']);
			    break;
			case 4:
			    this.router.navigate(['/part-four/les-appareils']);
			    break;
		    }
		}
	    )
	    .catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }
}
