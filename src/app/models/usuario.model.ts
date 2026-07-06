export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    google_id?: string;
    estado: boolean;
}