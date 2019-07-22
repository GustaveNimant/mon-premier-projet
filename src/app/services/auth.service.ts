export class AuthService {

    isAuth = false;
    
    signIn () {
	console.log('Entrée dans singIn avec isAuth', this.isAuth);

	let promise = new Promise(
	    (resolve, reject) => {
		setTimeout( /* fonction Javascript*/
		    () => { /* attendre 2 secondes puis authentifier */
			this.isAuth = true;
			resolve('ok'); /* output */
		    },
		    2000
		);
	    }
	);
	console.log('Sortie de singIn avec isAuth', this.isAuth);
	return promise;
    }
	    
    signOut () {
	console.log('Entrée dans singOut avec isAuth', this.isAuth);
	this.isAuth = false;		
    }  
}
