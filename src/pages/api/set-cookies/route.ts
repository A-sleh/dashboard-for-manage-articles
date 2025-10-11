import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { locale } = await request.json();

  const response = NextResponse.json({ message: 'Locale updated' });

  // Set cookie valid for 1 year
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // Expirte after 30 days
  });

  return response;
}
