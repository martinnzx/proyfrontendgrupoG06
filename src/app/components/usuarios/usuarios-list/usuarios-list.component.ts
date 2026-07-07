import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[] = [];

  cargando: boolean = true;

  mensajeExito: string = '';
  mensajeError: string = '';

  usuarioSeleccionado: Usuario | null = null;
  usuarioParaRoles: Usuario | null = null;
  rolesUsuario: string[] = [];

  editForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.editForm = this.fb.group({
      nombre:   ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (response: any) => {
        this.cargando = false;
        if (response.status === '1') {
          this.usuarios = response.usuarios;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = 'Error al cargar los usuarios.';
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalEditar(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.editForm.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      password: ''
    });
  }

  guardarEdicion(): void {
    if (this.editForm.invalid || !this.usuarioSeleccionado) return;

    const datos: any = {
      nombre: this.editForm.value.nombre,
      apellido: this.editForm.value.apellido,
      email: this.editForm.value.email,
    };

    if (this.editForm.value.password) {
      datos.password = this.editForm.value.password;
    }

    this.usuarioService.updateUsuario(this.usuarioSeleccionado.dni, datos).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Usuario modificado correctamente.';
          this.cargarUsuarios();
        } else {
          this.mensajeError = response.msg;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'Error al modificar el usuario.';
        this.cdr.detectChanges();
      }
    });
  }

  cambiarEstado(usuario: Usuario): void {
    const accion = usuario.estado
      ? this.usuarioService.inactivarUsuario(usuario.dni)
      : this.usuarioService.activarUsuario(usuario.dni);

    accion.subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = `Usuario ${usuario.estado ? 'inactivado' : 'activado'} correctamente.`;
          this.cargarUsuarios();
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'Error al cambiar el estado del usuario.';
        this.cdr.detectChanges();
      }
    });
  }

  eliminarUsuario(dni: string): void {
    if (!confirm('¿Estás seguro de que querés eliminar este usuario? Esta acción no se puede deshacer.')) return;

    this.usuarioService.deleteUsuario(dni).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Usuario eliminado correctamente.';
          this.cargarUsuarios();
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'Error al eliminar el usuario.';
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalRoles(usuario: Usuario): void {
    this.usuarioParaRoles = usuario;
    this.cargarRolesUsuario(usuario.dni);
  }

  cargarRolesUsuario(dni: string): void {
    this.rolService.getRolesByUsuario(dni).subscribe({
      next: (res: any) => {
        if (res.status === '1') {
          this.rolesUsuario = res.roles.map((r: any) => r.nombre);
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'Error al cargar roles del usuario.';
        this.cdr.detectChanges();
      }
    });
  }

  tieneRol(nombreRol: string): boolean {
    return this.rolesUsuario.includes(nombreRol);
  }

  toggleRol(nombreRol: string): void {
    if (!this.usuarioParaRoles) return;
    const dni = this.usuarioParaRoles.dni;

    if (this.tieneRol(nombreRol)) {
      this.rolService.removeRolFromUsuario(dni, nombreRol).subscribe({
        next: (res: any) => {
          if (res.status === '1') {
            this.rolesUsuario = this.rolesUsuario.filter(r => r !== nombreRol);
            this.mensajeExito = `Rol ${nombreRol} revocado.`;
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensajeError = 'Error al revocar rol.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.rolService.assignRolToUsuario(dni, nombreRol).subscribe({
        next: (res: any) => {
          if (res.status === '1') {
            this.rolesUsuario.push(nombreRol);
            this.mensajeExito = `Rol ${nombreRol} asignado.`;
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensajeError = 'Error al asignar rol.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}