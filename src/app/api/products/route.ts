import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
