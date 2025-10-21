import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel, regesterModel } from '../context/DTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {

  }


  login(model: loginModel) {
    return this._http.post('http://localhost:8080/auth/login', model)
  }
  regester(model: regesterModel) {
    return this._http.post('http://localhost:8080/auth/createAccount', model)
  }
}
