import { NextResponse } from "next/server"

export async function POST(request) {
  const res = await request.json()
  if (!res.videoId) {
    return NextResponse.json(
      {
        message: "Please provide a videoId",
      },
      {
        status: 301,
      }
    )
  }

  fetch(`http://${process.env.ORCHESTRATOR_URL}/release`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.PRIVATE_API_KEY,
    },
    body: JSON.stringify({ videoIds: [res.videoId] }),
  })
  return NextResponse.json({ status: "ok" })
}
