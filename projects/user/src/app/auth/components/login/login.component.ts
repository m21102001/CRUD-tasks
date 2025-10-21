import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(
    private _services: LoginService,
    private _fb: FormBuilder,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      role: ['user']
    })
  }

  login() {
    this._services.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('userId', res.userId)
        console.log(res);
        this._router.navigate(["/users/allUser"])

      }, error: (err) => {
        console.log(err);

      }

    })
    // console.log(this.loginForm.value);
  }

}
