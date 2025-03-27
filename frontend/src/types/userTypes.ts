export interface RegisterFormData {
    correo: string;
    nombre: string;
    apellido: string;
    contraseña: string;
    imagen: string;
    rol: string;
}

export interface LoginFormData {
    correo: string;
    contraseña: string;
}

export enum UserRole {
    Usuario = "usuario",
    Farmaceutico = "farmaceutico",
    Admin = "admin",
}