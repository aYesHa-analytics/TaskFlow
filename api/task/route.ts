import { NextResponse } from 'next/server';

// Example API route for future Firebase / backend integration
export async function GET() {
  return NextResponse.json({ message: 'Tasks API ready - connect Firebase here' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, task: body });
}