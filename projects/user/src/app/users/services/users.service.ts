import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }




  allUsers() {
    return this._http.get('http://localhost:8080/auth/users')
  }
}
