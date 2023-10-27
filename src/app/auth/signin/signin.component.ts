import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private authService: AuthService
  ) {
  }

  signInForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    let form: FormGroup = this.signInForm.value

    this.authService.createSignIn(this.userFactory(form))
      .subscribe(
        data =>
          console.log(data),
        error => console.log(error)
      )
    console.warn(this.signInForm.value);
  }

  private userFactory(form: FormGroup): User {
    return {
      email: form.value.email,
      password: form.value.password
    }
  }
}
