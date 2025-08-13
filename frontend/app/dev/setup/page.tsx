import React from "react"

import getApiKey from "@/lib/getApiKey"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ApiKeyCard from "@/components/api_key_component"
import Code_Card from "@/components/code_card"
import NumberedListItem from "@/components/numbered_list"

async function Setup() {
  const apiKey = await getApiKey()
  const uploadCode =
    `import os\n` +
    `from hitl import Uploader \n\n` +
    `uploader = Uploader(\n` +
    `    "${apiKey}",\n` +
    `    "daisthree.ucd.ie",\n` +
    `)\n\n` +
    `directory = "./videos"\n` +
    `for filename in os.listdir(directory):\n` +
    `    if filename.endswith(".mp4") or filename.endswith(".mov"):\n` +
    `        print(os.path.join(directory, filename))\n` +
    `        uploader.upload(\n` +
    `            os.path.join(directory, filename),\n` +
    `            "Flipper AI",\n` +
    `            "The Goal of this output is to make the stick man do a backflip",\n` +
    `            ["test_additional_metadata"],\n` +
    `        )\n` +
    `    else:\n` +
    `        continue`

  const resultsCode =
    `from hitl import Uploader\n\n` +
    `uploader = Uploader(\n` +
    `    "${apiKey}",\n` +
    `    "daisthree.ucd.ie",\n` +
    `)\n\n` +
    `results = uploader.get_results()`

  return (
    <main className="container py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dev">Dev</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dev/setup">Setup</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="py-5 flex flex-col gap-10">
        <NumberedListItem number={1}>
          <ApiKeyCard api_key={apiKey} />
        </NumberedListItem>
        <NumberedListItem number={2}>
          <Code_Card
            title="Install the Python Module"
            code="pip install hitl"
          />
        </NumberedListItem>
        <NumberedListItem number={3}>
          <Code_Card
            title="Upload a stitched video"
            code={uploadCode}
            terminal={false}
            copy={false}
          />
        </NumberedListItem>
        <NumberedListItem number={4}>
          <Code_Card
            title="Get the results"
            code={resultsCode}
            terminal={false}
            copy={false}
          />
        </NumberedListItem>
      </section>
    </main>
  )
}

export default Setup
