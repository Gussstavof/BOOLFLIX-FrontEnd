import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signInForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    let form: any = this.signInForm.value

    this.authService.createSignIn({
      email: form.email,
      password: form.password
    }).subscribe(async res => {
      if (res.status === 200 && res.body) {
        sessionStorage.setItem('token', res.body.token);
        await this.router.navigateByUrl('home');
      }
    });
  }
}
