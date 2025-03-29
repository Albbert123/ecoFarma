export interface RegisterFormData {
    correo: string;
    nombre: string;
    apellido: string;
    contraseña: string;
    imagen: string;
    rol: string;
    fromAdmin?: boolean;
}

export interface LoginFormData {
    correo: string;
    contraseña: string;
}

export interface UpdateFormData {
    nombre: string;
    apellido: string;
    correo: string;
    new_correo?: string;
    imagen: string;
}

export enum UserRole {
    Usuario = "usuario",
    Farmaceutico = "farmaceutico",
    Admin = "admin",
}

export interface UserCardData {
    correo: string;
    nombre: string;
    apellido: string;
    rol: string;
    encargos: string[];
    consultas: string[];
}  

export interface PharmCardData {
    correo: string;
    nombre: string;
    apellido: string;
    rol: string;
} 