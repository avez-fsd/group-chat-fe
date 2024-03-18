import { signIn, signUp } from "@/services/auth/auth"
import { decodeJwtToken } from "@/utils/jwtHelper"
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:'sign-in',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              }, 
              async authorize(credentials, req) {
                const payload = {
                    email: credentials?.email,
                    password: credentials?.password
                }
                const {isError, data, error} = await signIn(payload);
                
                if (!isError) {
                    const jwtDecode = decodeJwtToken(data.data.token);
                    const user = {
                        id: jwtDecode?.id,
                        email: jwtDecode?.email as string,
                        name: jwtDecode?.name as string,
                        accessToken: data.data.token
                    };
                    return user as User;
                } else{
                    throw new Error(error);
                }
              }
        }),
        CredentialsProvider({
            id:'sign-up',
            name: 'Credentials',
            credentials: {
                name: { label: "Name", type: "text", placeholder: "jsmith" },
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              }, 
              async authorize(credentials, req) {
                const payload = {
                    name: credentials?.name,
                    email: credentials?.email,
                    password: credentials?.password
                }
                const {isError, data, error} = await signUp(payload);
                
                if (!isError) {
                    const jwtDecode = decodeJwtToken(data.data.token);
                    const user = {
                        id: jwtDecode?.id,
                        email: jwtDecode?.email as string,
                        name: jwtDecode?.name as string,
                        accessToken: data.data.token
                    };
                    return user as User;
                } else{
                    throw new Error(error);
                }
              }
        }),
        
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, token, user}) {
            session.user = token;
            return session;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }