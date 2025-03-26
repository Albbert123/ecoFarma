export interface RegisterFormData {
    correo: string;
    nombre: string;
    apellido: string;
    contraseña: string;
    es_google?: boolean;
    rol: string;
}

export interface LoginFormData {
    correo: string;
    contraseña: string;
    es_google?: boolean;
}

export interface GoogleUserFormData {
    correo: string;
    nombre: string;
    apellido: string;
    imagen?: string;
    es_google?: boolean;
    rol: string;
}

export interface UserRole {
    usuario: string;
    farmaceutico: string;
    admin: string;
}