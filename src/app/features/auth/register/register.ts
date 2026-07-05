declare var google: any;

import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { GoogleAuthService, GoogleUser } from '../../../core/services/google-auth';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private googleAuthService = inject(GoogleAuthService);
  private userSub!: Subscription;

  loading = false;
  googleUser: GoogleUser | null = null;

  form = this.fb.nonNullable.group(
    {
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator },
  );

  ngAfterViewInit(): void {
    this.googleAuthService.initializeGoogleSignIn('googleBtnRegister');
    this.userSub = this.googleAuthService.currentUser$.subscribe((user) => {
      this.googleUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...data } = this.form.getRawValue();
    this.loading = true;
    this.authService.register(data).subscribe(() => {
      this.loading = false;
      this.router.navigateByUrl('/login');
    });
  }

  signOut(): void {
    this.googleAuthService.signOut();
  }
}
