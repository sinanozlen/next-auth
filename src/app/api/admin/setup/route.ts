import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Check if admin users already exist
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@test.com',
      name: 'Admin User',
      auth0Id: 'auth0|admin-test',
      role: 'admin',
    });

    // Create regular user
    const regularUser = await User.create({
      email: 'user@test.com',
      name: 'Regular User',
      auth0Id: 'auth0|user-test',
      role: 'user',
    });

    return NextResponse.json({
      message: 'Test users created successfully',
      users: {
        admin: {
          email: adminUser.email,
          role: adminUser.role,
        },
        user: {
          email: regularUser.email,
          role: regularUser.role,
        },
      },
    });
  } catch (error) {
    console.error('Setup Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 