import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service'; // importer pour avoir la main sur user veriffier s'il est connecté /non
import { PanierService } from '../panier.service';
import { from, Observable } from 'rxjs';



@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  produits: Object[] = new Array();
  user: Observable <string> ;

  constructor(private panierService:PanierService,
    private authentificationService:AuthentificationService) {

      this.user = this.authentificationService.getUser();  //on recupere un observable  pour recuperer son email


    }

  ngOnInit(): void {
    let email = "";
    this.user.subscribe(valeur => {
      email = valeur;
    });
    this.panierService.getPanier(email).subscribe(produits=>{ //email  ligne 26
      this.produits = produits;});



  }

}
