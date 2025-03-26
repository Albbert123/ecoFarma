import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
      jwt?: string;
      googleData?: {
        correo: string;
        nombre: string;
        apellido: string;
        imagen: string;
        es_google: boolean;
        rol: string;
      };
    };
  }

  interface User {
    id: string;
    role: string;
    jwt: string;
    googleData?: {
      correo: string;
      nombre: string;
      apellido: string;
      imagen: string;
      es_google: boolean;
      rol: string;
    };
  }
}
