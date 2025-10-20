import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { UpdateStatusTask } from '../context/DTO';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _http: HttpClient) { }

  getAllTasks(filter: any) {
    // let headers = new HttpHeaders({
    //   Authorization: 'Bearer ' + localStorage.getItem('token')
    // })
    // headers.append('Authorization', 'Bearer ' + JSON.stringify(localStorage.getItem('token')))
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params = params.set(key, value)
      }
    })
    return this._http.get(`${environment.apiUrl}tasks/all-tasks`, { params })
  }
  cteateTask(model: FormData) {
    return this._http.post(`${environment.apiUrl}tasks/add-task`, model)
  }

  viewDetailsTask(id: string) {
    return this._http.get(`${environment.apiUrl}tasks/task/${id}`)
  }
  UpdateStatusTask(model: UpdateStatusTask) {
    return this._http.put(`${environment.apiUrl}tasks/complete`, model)
  }
  deleteTask(id: string) {
    return this._http.delete(`${environment.apiUrl}tasks/delete-task/${id}`)
  }
  getAllTasksRelatedUser(id: string) {
    return this._http.get(`${environment.apiUrl}tasks/user-tasks/${id}`)
  }
}
