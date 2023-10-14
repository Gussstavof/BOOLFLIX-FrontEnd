import { Component } from '@angular/core';
import {SignupService} from "../../services/signup.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {SigninService} from "../../services/signin.service";

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.css']
})
export class FormSigninComponent {
  constructor(
    private signinService: SigninService
  ) {}

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    let form = this.signinForm.value;

    this.signinService.create(new User(form))
      .subscribe(
        data =>
          console.log(data),
        error => console.log(error)
      )

    console.warn(this.signinForm.value);
  }
}
