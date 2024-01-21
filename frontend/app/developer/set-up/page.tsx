"use client"

import { useUserData } from "@/providers/user-context"
import { Terminal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import TerminalCode from "@/components/terminal"

const code = `from hitl import HITL
client = HITL(api_key="")
client.send(video.mp4, { "name": "video.mp4" })`

export default function Setup() {
  const {
    userData: { key },
  } = useUserData()
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-1 md:py-10">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Install Pip Module</AlertTitle>
          <AlertDescription>
            <TerminalCode code="pip install hitl" className="pt-5" />
          </AlertDescription>
        </Alert>

        <CodeBlock title="Example Usage" code={code} />
        <CodeBlock title="API Key" code={key + "\n" || "No api key found"} />
      </section>
    </>
  )
}
