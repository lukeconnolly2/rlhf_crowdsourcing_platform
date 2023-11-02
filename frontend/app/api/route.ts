export const runtime = "edge";

export async function GET() {
    const res = await fetch('http://orchastrator:8080/videolinks')
    const links = await res.json()
    console.log(links, "links")
    return Response.json({ links })
  }