import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

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

  ngOnInit(): void {
    
    google.accounts.id.initialize({
      client_id: '433208848698-rpq6f7cudalbf3si6opvalqs86hpum5o.apps.googleusercontent.com',
      callback: this.handleGoogleResponse.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large", text: "continue_with" }
    );
  }

  handleGoogleResponse(response: any): void {
    const googleToken = response.credential;
    this.loading = true;
    this.cdr.detectChanges();
    
    this.loginService.loginConGoogle(googleToken).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.status === '1') {
          this.loginService.saveSession(
            res.token,
            res.usuario.email,
            res.usuario.id,
            res.usuario.nombre,
            res.usuario.rol || 'socio'
          );
          this.router.navigate(['/home']);
        } else {
          this.errorMsg = res.msg || 'Error al iniciar sesión con Google';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.msg || 'Error de conexión con el servidor al autenticar con Google.';
        console.error("Error al loguearse con Google:", err);
        this.cdr.detectChanges();
      }
    });
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
            response.usuario.nombre,
            response.usuario.rol
          );
          this.router.navigate(['/home']);
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
          this.errorMsg = err.error?.msg || 'Error al conectar con el servidor. Intentá de nuevo.';
        }
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}