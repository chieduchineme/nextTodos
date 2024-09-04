import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismadb from '@/lib/prismadb';

// Configuration options for NextAuth
export const authOptions: AuthOptions = {
  // Authentication providers
  providers: [
    // Google authentication provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
    }),
    // GitHub authentication provider
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET || '',
    }),
    // Custom credentials provider for email and password authentication
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // Fetch user by email from the database
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Verify if the user exists and has a hashed password
        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        // Compare provided password with stored hashed password
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        // Throw error if the password is incorrect
        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }

        // Return user object if authentication is successful
        return user;
      },
    }),
  ],
  
  // Custom pages for authentication flows
  pages: {
    signIn: '/auth', // Sign-in page path
  },

  // Debugging configuration
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development

  // Prisma adapter for database integration
  adapter: PrismaAdapter(prismadb),

  // Session management configuration
  session: { strategy: 'jwt' }, // Use JSON Web Token (JWT) for session management

  // JSON Web Token (JWT) configuration
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET, // Secret for signing JWTs
  },

  // Secret used for encryption
  secret: process.env.NEXT_AUTH_SECRET, // Secret for NextAuth encryption
};

// Export NextAuth with the defined options
export default NextAuth(authOptions);
