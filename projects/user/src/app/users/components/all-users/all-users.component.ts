import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  constructor(private _service: UsersService) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    this._service.allUsers().subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
