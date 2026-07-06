import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  
  errorMsg: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get emailControl() { return this.loginForm.get('email'); }
  get passwordControl() { return this.loginForm.get('password'); }
  
  get isEmailInvalid() {
    const control = this.emailControl;
    return control ? control.invalid && control.touched : false;
  }
  get isPasswordInvalid() {
    const control = this.passwordControl;
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.login(email, password).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.status === '1') {
          this.loginService.saveSession(
            response.token,
            response.usuario.email,
            response.usuario.id,
            response.usuario.nombre
          );
          this.router.navigate(['/usuarios']);
          // window.location.href = '/usuarios';
        } else {
          this.errorMsg = response.msg;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMsg = 'Credenciales inválidas. Verificá tu email y contraseña.';
        } else {
          this.errorMsg = 'Error al conectar con el servidor. Intentá de nuevo.';
        }
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}