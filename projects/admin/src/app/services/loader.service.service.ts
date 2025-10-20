import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  constructor() { }
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  show() {
      return this.isLoading.next(true)
    }
    hide() {
    return this.isLoading.next(false)
  }
}
 