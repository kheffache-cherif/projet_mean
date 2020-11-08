import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { ProduitsService } from '../produits.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {


  public utilisateur = {"email":"", "password":""};
  public message: string = "";

  constructor(private authService: AuthentificationService,
              private router: Router) { }

  onSubmit() {

   this.authService.verificationConnexion(this.utilisateur).subscribe(reponse => {
      this.message = reponse['message'];
      console.log (this.message);
      if (reponse['resultat']) {
        this.authService.connect(this.utilisateur.email);
	      this.router.navigate(['/produits']);
      }

    });
    console.log ("boutonSubmit");
  }
}
