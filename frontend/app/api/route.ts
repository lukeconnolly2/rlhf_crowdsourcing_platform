export const runtime = "edge";
import { NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch(`http://${process.env.ORCHESTRATOR_URL}/video`, { cache: 'no-store' })
    const videos = await res.json()
    return NextResponse.json(videos)
  }