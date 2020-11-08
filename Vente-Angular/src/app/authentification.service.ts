import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';  // creation d'un observable
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
export class AuthentificationService {
  user:Subject<string> = new BehaviorSubject<string>(undefined);// des l'objet change de valeur on le saura
  baseURL: string = "http://localhost:8888/";

  constructor(private http: HttpClient) { }

  getUser() {
      return this.user;
  }
  connect(data: string) {
      this.user.next(data);
  }
  disconnect() {
      this.user.next(null);
  }

  verificationConnexion(identifiants): Observable<any> {
      return this.http.post(this.baseURL+'membres/authentification',
       JSON.stringify(identifiants), httpOptions);

  }

}





















































