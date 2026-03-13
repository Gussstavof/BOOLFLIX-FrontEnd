import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigateByUrl('/');
    }
  }

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
  });

  onSubmit() {
    if (this.signInForm.invalid) return;

    const form = this.signInForm.getRawValue();
    this.authService.login({ email: form.email, password: form.password }).subscribe(async (res) => {
      if (res.status === 200 && res.body?.token) {
        await this.router.navigateByUrl('/');
      }
    });
  }
}
