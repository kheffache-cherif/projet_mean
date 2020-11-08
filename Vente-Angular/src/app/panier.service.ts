import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};



@Injectable({
  providedIn: 'root'
})
export class PanierService {
  baseURL: string = "http://localhost:8888/";
  constructor(

      private http:HttpClient) { }




     // ajoutpanier

      AjouterAuPanier( produit : Object) {   //appeller du produits.component.ts avec 1 objer panier
        console.log (produit["nom"]);
          let panier = {"nom": "", "email": ""};
          panier["nom"] = produit["nom"];
          panier["email"] = produit["email"];
  /* le reste creation et affectation du panier let.. */

          return this.http.post(this.baseURL+"ajoutpanier",// appel de node avec lien ajoutpanier
        JSON.stringify(panier),  //  //on lui passe un element panier pour l'enregister
        httpOptions).subscribe(res => {console.log(res)});// affichage du retour de node.

      }



      getPanier(email): Observable<any>{   // creation de la  methode qui recupere les panier )à partir de node
        return this.http.get(this.baseURL+'getPanier/'+email);  //on fait appel au service node qui retourne les produits associer au panier
  }





}


