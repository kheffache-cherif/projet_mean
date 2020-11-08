import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router}  from '@angular/router';
import { ProduitsService } from '../produits.service';
import { from, Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';





@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class  CategoriesComponent  implements OnInit{
     public user: Observable <string> ;
     public categories: String [] = new Array();          // typeScript string fortement typé

    constructor(private router:Router,   // Categorie: Categorie
                 authService: AuthentificationService,
                 private  produitsService: ProduitsService){  //private produits paramettre d'instance de Produits
                 this.user = authService.getUser();


                 }








  ngOnInit () : void {
    console.log("dans ngOnInit() du composant produits");
    this.produitsService.getCategories().subscribe(categories=>{
      this.categories = categories;
    });
  }

produitsParCategorie(categorie){   // naviger vers produits et comme parametre categorie
  this.router.navigate(['/produits',categorie]);

}

}
