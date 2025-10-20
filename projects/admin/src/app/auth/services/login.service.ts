import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTO';
import { environment } from 'environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  
  login(model: Login) {
    return this.http.post(`${environment.apiUrl}auth/login`, model)
  }
}
