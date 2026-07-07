import { Suscripcion } from './suscripcion.model';

export class Tarifa {
    id!: number;
    anio!: string;
    mes!: string;
    precio!: string;
    pagado!: boolean;
    activo!: boolean;
    
    suscripcion?: Suscripcion;
}
