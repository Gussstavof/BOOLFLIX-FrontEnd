import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private authService: AuthService
  ) {
  }

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
    })
      .subscribe(
        data =>
          console.log(data),
        error => console.log(error)
      )
    console.warn(form);
  }
}
