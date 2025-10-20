import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrom!: FormGroup
  constructor(
    private fb: FormBuilder,
    private services: LoginService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.loginFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      role: ['admin']

    })
  }
  login() {
    this.services.login(this.loginFrom.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        this.toastr.success('login Success');
        this.router.navigate(["/tasks"])
        console.log(res);
      },
      error: err => {
        console.log(err)
      }
    })
    console.log(this.loginFrom.value)
  }

}
