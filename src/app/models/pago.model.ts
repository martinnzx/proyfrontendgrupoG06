import { Tarifa } from './tarifa.model';

export class Pago {
    id!: number;
    fecha!: string;
    transaccion!: string;
    monto!: string;
    activo!: boolean;
    
    tarifa?: Tarifa;
}
