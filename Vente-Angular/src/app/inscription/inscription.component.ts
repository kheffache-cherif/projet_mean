import { Component, OnInit } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})




export class InscriptionComponent implements OnInit {


     httpOpt = {
        headers: new HttpHeaders({

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
            'Access-Control-Allow-HEADERS': "Content-Type",
            "Content-Type": "application/json"

        })
    };


    utilisateur = { "nom": "", "prenom": "", "email": "", "password": "" };
    constructor (private http:HttpClient, private router: Router) { }

  ngOnInit() {

  }

    onSubmit(form: NgForm) {
        console.log(form.value.nom);
        console.log(this.utilisateur.email);

        return this.http.post("http://localhost:8888/inscription",// appell du srvice à cette adresse
        JSON.stringify(this.utilisateur),  //   passage de donnes en format Json ligne 33
        this.httpOpt).subscribe(res => {console.log(res)});// affichage du message de node

}

}
