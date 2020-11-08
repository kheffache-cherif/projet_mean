import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router}  from '@angular/router';




@Component({     //  pour declarer un component
  selector: 'app-root',   // nom de la balise utilisée pour l'integrer dans index.html
  templateUrl: './app.component.html',  //aff ichage de la vue
  styleUrls: ['./app.component.css']
})
export class AppComponent {  //declaration de variables
  title = 'Vente';

constructor ( private router: Router ){ router.navigate(['/acceuil']);}


}
