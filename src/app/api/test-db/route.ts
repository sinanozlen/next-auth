import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await dbConnect();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      uri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      uri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    }, { status: 500 });
  }
} 