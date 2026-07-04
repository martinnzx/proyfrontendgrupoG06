import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Usuario } from '../../../core/models/usuario';
import { UsuarioService } from '../../../core/services/usuario';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-list.html'
})
export class UsuarioListComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (result: any) => {
        if (result && result.usuarios) {
          this.usuarios = result.usuarios;
        } else {
          this.usuarios = result;
        }
      },
      error: (error) => {
        console.error("Error al cargar los usuarios:", error);
        alert("Error al cargar");
      }
    });
  }
}