import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  constructor(
    private _service: UsersService,
    private _toaster: ToastrService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.addUserForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]// default user role
    })
  }


  addNewUser() {
    if (this.addUserForm.invalid) {
      this._toaster.warning('Please fill all fields correctly');
      return;
    }
    const userData = this.addUserForm.value;
    this._service.addNewUser(userData).subscribe({
      next: (res) => {
        this._toaster.success("add new user successfuly", 'success')
        
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


}
