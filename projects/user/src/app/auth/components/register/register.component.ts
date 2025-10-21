import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFrom!: FormGroup

  constructor(private _services: LoginService, private _fb: FormBuilder) { }
  ngOnInit(): void {
    this.createFrom()
  }
  createFrom() {
    this.registerFrom = this._fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['user'],
    })
  }

  register() {
    this._services.regester(this.registerFrom.value).subscribe({
      next: (res: any) => {
        console.log(res);
      }, error: err => {
        console.log(err);
      }
    })
  }
}
