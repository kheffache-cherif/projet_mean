import { Component, OnInit } from '@angular/core';   // onInit veut dire initialisation avant affichage
import { ActivatedRoute, Params}  from '@angular/router';
import { ProduitsService } from '../produits.service';
import { from, Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service'; // importer pour avoir la main sur user veriffier s'il est connecté /non
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { PanierService } from '../panier.service';
@Component({
  selector: 'app-produits',    //selector indique la déclaration qui permet d'inserer le composant dant document HTML  46:30
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
     produits: Object[] = new Array();          // pour le private
     user: Observable <string> ;



     httpOpt = {
      headers: new HttpHeaders({  // comme des autorisation eviter les cors passage du code client serveur

          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
          'Access-Control-Allow-HEADERS': "Content-Type",
          "Content-Type": "application/json"

      })
  };






     constructor(private produitsService: ProduitsService,  private route: ActivatedRoute,
     private authService: AuthentificationService,private panierService:PanierService) { // private route :ActvatedRoute pour recuperer le parametre souscrire à l'observable
     this.user = this.authService.getUser();  //recuperer l'utilisateur du serveur

  }

  ngOnInit(): void {  // retourner
    this.route.params.subscribe((params:Params)=>{  //  declaration de l'observable ligne 16
           if (params["categorie"] !== undefined){  // si param different de null  si oui
                this.produitsService.produitsParCategorie (params["categorie"]).subscribe(produits=>{  // on recupere que les produits de categorie passé en parametre
                  this.produits = produits;});  //



           }else{ // si     pas pas de categorie en params  en recupere tout les produits
                this.produitsService.getProduits().subscribe(produits=>{
                this.produits = produits;});
           }



    });
    console.log("dans ngOnInit() du composant produits");


  }
/*  methode appeler lors du click sur le boton ajoutPanier*/
    AjouterAuPanier( produit : Object) {   //produit conserné par le bouton
    console.log (produit["nom"]);   /// on recupere le nom du produit
    let panier = {"nom": "", "email": ""};  // objet panier Json
    panier["nom"] = produit["nom"];  // affectation  du nom de l'objet du panier

    let email = "";
    this.user.subscribe(valeur => {   //recuperation de la valeur email de lobservable

      email = valeur;   //sauvgarde de la valeur dans email

    });
    panier["email"] =email;  // affectation pour l'objet panier l'email

    console.log(panier["email"]);
    this.panierService.AjouterAuPanier(panier) ;  // appele de la methode ajoutpanier du service.panier angular avec objet panier




  }
}
