import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV!=="production") {
    globalThis.prisma = db // makes sure that Prisma client is reused across hot reloads
}