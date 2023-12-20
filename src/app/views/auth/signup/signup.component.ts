import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    let form: any = this.signupForm.value;

    this.authService.createSignup({
      username: form.username,
      email: form.email,
      password: form.password
    }).subscribe(async res => {
      console.log(res)
      if (res.status === 201 && res.body) {
        sessionStorage.setItem('token', res.body.token);
        await this.router.navigateByUrl('home');
      }
    });
  }
}
