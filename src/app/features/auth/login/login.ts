declare var google: any;

import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { GoogleAuthService, GoogleUser } from '../../../core/services/google-auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private googleAuthService = inject(GoogleAuthService);
  private userSub!: Subscription;

  loading = false;
  googleUser: GoogleUser | null = null;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngAfterViewInit(): void {
    this.googleAuthService.initializeGoogleSignIn('googleBtn');
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

    this.loading = true;
    this.authService.login(this.form.getRawValue()).subscribe(() => {
      this.loading = false;
      this.router.navigateByUrl('/');
    });
  }

  signOut(): void {
    this.googleAuthService.signOut();
  }
}
