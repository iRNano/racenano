import NextAuth from 'next-auth';
import { authOptions } from '../authOptions';
import { NextRequest, NextResponse } from 'next/server';
interface RouteHandlerContext {
  params: Promise<{ nextauth: string[] }>;
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  // Await params to satisfy Next.js 15 requirements
  await context.params; 
  const res = NextResponse.json(await NextAuth(authOptions));
  return res;
};

export { handler as GET, handler as POST };

