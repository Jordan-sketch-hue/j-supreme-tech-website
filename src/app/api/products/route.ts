import { NextRequest, NextResponse } from 'next/server';
import { productsData } from '@/lib/productsConfig';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

