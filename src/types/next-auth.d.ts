//this file extends nextauth's default types to add custom properties
import NextAuth from "next-auth";

//extends existing module types
declare module "next-auth" {
  interface Session { //add custom properties
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

//.d.ts -> ts declaration file