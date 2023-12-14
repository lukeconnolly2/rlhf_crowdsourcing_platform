export const runtime = "edge";

export async function GET() {
    const res = await fetch(`http://${process.env.ORCHESTRATOR_URL}/video`, { cache: 'no-store' })
    const videos = await res.json()
    return Response.json(videos)
  }