import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  
  // This route will be handled by NextAuth's signin page
  // Redirect to NextAuth signin with the provider
  const signInUrl = `/api/auth/signin/${provider}`;
  return NextResponse.redirect(new URL(signInUrl, request.url));
}

