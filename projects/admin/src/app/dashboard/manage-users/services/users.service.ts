import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { GetAlluserModel, UpdateUserStatusModel, userModel } from '../context/DOT';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }


  getAllUsers() {
    return this._http.get(`${environment.apiUrl}auth/users`)
  }
  addNewUser(model: userModel) {
    return this._http.post(`${environment.apiUrl}auth/createAccount`, model)
  }
  UpdateUserStatus(model: UpdateUserStatusModel) {
    return this._http.put(`${environment.apiUrl}auth/user-status`, model)
  }
  deleteUser(id: any) {
    return this._http.delete(`${environment.apiUrl}auth/user/${id}`)
  }
}
