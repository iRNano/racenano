import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database query
    // const user = await db.user.findUnique({ where: { email } });
    // if (!user) {
    //   return NextResponse.json(
    //     { message: 'Invalid credentials' },
    //     { status: 401 }
    //   );
    // }

    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) {
    //   return NextResponse.json(
    //     { message: 'Invalid credentials' },
    //     { status: 401 }
    //   );
    // }

    // For now, return mock user (remove in production)
    return NextResponse.json({
      id: 'mock-user-id',
      email: email,
      name: 'Mock User',
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { message: 'An error occurred during verification' },
      { status: 500 }
    );
  }
}

