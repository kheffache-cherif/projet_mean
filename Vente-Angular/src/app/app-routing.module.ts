import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CategoriesComponent } from './categories/categories.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PanierComponent} from    './panier/panier.component';
const routes: Routes = [




  {path: 'acceuil',component:AcceuilComponent  },

  {path: 'inscription',component:InscriptionComponent  },

  {path: 'connexion',component:ConnexionComponent  },

  {path: 'produits/:categorie',component:ProduitsComponent },

  {path: 'produits',component:ProduitsComponent},

  {path:'categories',component:CategoriesComponent },

  {path: 'panier',component:PanierComponent  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
