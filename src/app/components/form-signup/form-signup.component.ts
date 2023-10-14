import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {SignupService} from "../../services/signup.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent {

  constructor(
    private signupService: SignupService
  ) {}

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });


  onSubmit() {
    let form = this.signupForm.value;

    this.signupService.create(new User(form))
      .subscribe(
        data =>
          console.log(data),
          error => console.log(error)
      )

    console.warn(this.signupForm.value);
  }

}
