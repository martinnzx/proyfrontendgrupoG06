import { Usuario } from './usuario.model';

export class Suscripcion {
    id!: number;
    fecha_inicio!: string;
    fecha_fin!: string;
    precio!: string;
    activo!: boolean;
    
    usuario?: Usuario;
}
