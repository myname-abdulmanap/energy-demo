import NextAuth, { type NextAuthConfig, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Role type matching the one in types/next-auth.d.ts
type Role = "ADMIN" | "OPERATOR" | "VIEWER";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const HARDCODED_ADMIN = {
  id: "hardcoded-admin",
  name: "Admin",
  email: "admin@recheese.com",
  password: "admin123",
  role: "ADMIN" as Role,
};

const AUTH_SECRET =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  "dev-hardcoded-auth-secret-energy-demo";

export const authConfig: NextAuthConfig = {
  secret: AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const isValidHardcodedUser =
          email === HARDCODED_ADMIN.email &&
          password === HARDCODED_ADMIN.password;

        if (!isValidHardcodedUser) {
          return null;
        }

        return {
          id: HARDCODED_ADMIN.id,
          name: HARDCODED_ADMIN.name,
          email: HARDCODED_ADMIN.email,
          role: HARDCODED_ADMIN.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
