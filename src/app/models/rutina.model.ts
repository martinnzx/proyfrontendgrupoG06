import { Ejercicio } from './ejercicio.model';
import { Usuario } from './usuario.model';

export class Rutina {
    id!: number;
    dia_semana!: string;
    turno!: string;
    nombre!: string;
    descripcion!: string;
    activo!: boolean;
    
    ejercicio?: Ejercicio;
    usuario?: Usuario;
}