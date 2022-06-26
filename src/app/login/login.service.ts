import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "./login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  checkCredentials(login: Login) : Observable<boolean>{
    return this.http.post<boolean>(`${this.apiURL}/login`, login);
  }
}
