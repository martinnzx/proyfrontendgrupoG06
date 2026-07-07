import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

declare var google: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      nombre:   ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni:      ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get nombre()   { return this.registerForm.get('nombre'); }
  get apellido() { return this.registerForm.get('apellido'); }
  get dni()      { return this.registerForm.get('dni'); }
  get emailCtrl(){ return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  // Getters que devuelven true/false para el [class.is-invalid] del HTML
  get isNombreInvalid()   { const c = this.nombre;   return c ? c.invalid && c.touched : false; }
  get isApellidoInvalid() { const c = this.apellido; return c ? c.invalid && c.touched : false; }
  get isDniInvalid()      { const c = this.dni;      return c ? c.invalid && c.touched : false; }
  get isEmailInvalid()    { const c = this.emailCtrl; return c ? c.invalid && c.touched : false; }
  get isPasswordInvalid() { const c = this.password;  return c ? c.invalid && c.touched : false; }

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
        this.errorMsg = err.error?.msg || 'Error al conectar con Google.';
        console.error("Error al loguearse con Google:", err);
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const { nombre, apellido, dni, email, password } = this.registerForm.value;

    this.loginService.register(nombre, apellido, dni, email, password).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.status === '1') {
          this.successMsg = '¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMsg = response.msg;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error al conectar con el servidor. Intentá de nuevo.';
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}