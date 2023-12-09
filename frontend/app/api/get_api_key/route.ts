import { NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
    const user = request.nextUrl.searchParams.get("user")
    console.log(`${process.env.ORCHESTRATOR_URL}/getAPIKey?user=${user}`)
    const res = await fetch(`${process.env.ORCHESTRATOR_URL}/getAPIKey?user=${user}`,
        {
            headers: 
                { 
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.PRIVATE_API_KEY
                }
        }
    )
    const apikey = await res.json()
    console.log(apikey, "key")
    return Response.json({ apikey })
  }