// app.modules contient la class appModule .

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';





import { AppRoutingModule } from './app-routing.module';
import { AuthentificationService} from './authentification.service';
import { ProduitsService} from './produits.service';
import { PanierService} from './panier.service';


import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PanierComponent } from './panier/panier.component';


@NgModule({   //   decorateur declaration de ses attributs
  declarations: [     // chaque creation de web component = declaration
    AppComponent,
    ConnexionComponent,
    ProduitsComponent,
    CategoriesComponent,
    MenuComponent,
    InscriptionComponent,
    AcceuilComponent,
    PanierComponent



  ],
  imports: [    //
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  /// interagir avec la partie back end
    FormsModule   ///  module de gestion de formulaire
  ],

  // providers c'est pour declarer les services
  providers: [ProduitsService,AuthentificationService,PanierService],
  bootstrap: [AppComponent]     // composant racine  appCom.....

})
export class AppModule { }  // export veut dire que on peut l'importer dans un autre module
