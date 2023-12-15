import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private authService: AuthService
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
      })
      .subscribe(
        data =>
          console.log(data),
        error => console.log(error)
      )
    console.warn(this.signInForm.value);
  }
}
