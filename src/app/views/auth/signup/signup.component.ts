import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const form = this.signupForm.value;

    this.authService.createSignup({
      username: form.username,
      email: form.email,
      password: form.password
    }).subscribe(async res => {
      if (res.status === 201 && res.body) {
        await this.router.navigateByUrl('/home');
      }
    });
  }
}
