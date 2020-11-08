import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ProduitsService {
  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient) { }

getProduits(): Observable<any> {
      let url = this.urlBase + 'produits';
      console.log("dans le service ProduitService avec" + url);
      return this.http.get(url);

}




getCategories(): Observable<any> {
  let url = this.urlBase + 'categories';
  console.log("dans le service categories" + url);
  return this.http.get(url);

}


produitsParCategorie(categorie): Observable<any>{
      return this.http.get(this.urlBase+'produits/'+categorie);
}


}
