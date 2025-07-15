import { NextResponse } from 'next/server';
import { add_user } from '../../../../lib/database';

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = await request.json();
    
    console.log('Signup attempt:', { firstName, lastName, email });
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Check if passwords match (if confirmPassword is provided)
    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }
    
    // TODO: Check if user already exists in database
    // TODO: Hash password before storing
    // TODO: Save user to database
    
    // For now, simulate successful signup
    // In a real app, you would:
    // 1. Check if email already exists
    // 2. Hash the password using bcrypt
    // 3. Save user to database
    // 4. Send verification email (optional)
    
     try {
      // Save user to database using your existing function
      const result = await add_user(firstName, lastName, email, password);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Account created successfully',
        user: { 
          id: result.insertedId.toString(), 
          firstName,
          lastName,
          email
        }
      });
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Email already exists or database error' },
        { status: 409 }
      );
    }
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
