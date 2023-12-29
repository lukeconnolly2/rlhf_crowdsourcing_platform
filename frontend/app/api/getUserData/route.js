import { NextResponse } from 'next/server'

export async function GET(request) {
  const user = request.nextUrl.searchParams.get("user")
  const res = await fetch(`http://${process.env.ORCHESTRATOR_URL}/getUserData?user=${user}`, 
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': process.env.PRIVATE_API_KEY
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}