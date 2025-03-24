export interface RegisterFormData {
    correo: string;
    nombre: string;
    apellido: string;
    contraseña: string;
    rol: string;
}

export interface LoginFormData {
    correo: string;
    contraseña: string;
}

export interface UserRole {
    usuario: string;
    farmaceutico: string;
    admin: string;
}