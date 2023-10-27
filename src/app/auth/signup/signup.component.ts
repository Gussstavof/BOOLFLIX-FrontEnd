import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
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
    let form: FormGroup = this.signupForm.value;

    this.authService.createSignup(this.userFactory(form))
      .subscribe(
        data =>
          console.log(data),
        error => console.log(error)
      )

    console.warn(form);
  }

  private userFactory(form: FormGroup): User {
    return {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    }
  }
}
