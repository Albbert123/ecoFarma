import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          // Extraer datos relevantes del usuario de Google
          user.googleData = {
            correo: user.email,
            nombre: user.name?.split(" ")[0] || "",
            apellido: user.name?.split(" ")[1] || "",
            imagen: user.image || "",
            es_google: true,
            rol: "usuario" // Rol por defecto
          };
          return true;
        } catch (error) {
          console.error("Error procesando usuario de Google:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user?.googleData) {
        token.googleData = user.googleData;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.googleData) {
        session.user.googleData = token.googleData;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login?error=auth"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
