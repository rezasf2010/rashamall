import NextAuth from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
export const runtime = 'nodejs';

const handler = NextAuth(authOptions); // ✅ create once
export const GET = handler;
export const POST = handler;
