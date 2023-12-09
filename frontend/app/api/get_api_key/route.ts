import { NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
    const user = request.nextUrl.searchParams.get("user")
    const res = await fetch(`http://localhost:56983/getAPIKey?user=${user}`,
        {
            headers: 
                { 
                    'Content-Type': 'application/json',
                    'x-api-key': 'admin'
                }
        }
    )
    const apikey = await res.json()
    console.log(apikey, "key")
    return Response.json({ apikey })
  }