import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const form = this.signInForm.value;

    this.authService.createSignIn({
      email: form.email,
      password: form.password
    }).subscribe(async res => {
      if (res.status === 200 && res.body) {
        await this.router.navigateByUrl('/home');
      }
    });
  }
}
