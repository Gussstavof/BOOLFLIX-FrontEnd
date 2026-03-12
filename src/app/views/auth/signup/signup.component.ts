import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    this.authService.signup(this.signupForm.value as { username: string; email: string; password: string }).subscribe({
      next: async (res) => {
        if (res.status === 201) {
          await this.router.navigateByUrl('/home');
        }
      }
    });
  }
}
