export class Usuario {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;

  constructor(nombre: string = "", apellido: string = "", dni: string = "", email: string = "") {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
  }
}