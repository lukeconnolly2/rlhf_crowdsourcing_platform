import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section className="container grid  items-center gap-6 md:py-10 h-screen">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            A human in the loop framework.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Themis was developed as part of a research project in Human-AI Interaction.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.about}
            className={
              buttonVariants({ variant: "outline" }) + " w-1/6 h-24 text-xl"
            }
          >
            About
          </Link>
          <Link
            href={siteConfig.links.hitl}
            className={buttonVariants() + " w-1/6 h-24 text-xl"}
          >
            Sign in.
          </Link>
        </div>
      </section>
      <section
        className="container grid items-center gap-6 pb-8 pt-6 md:py-10 h-screen"
        id="about"
      >
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            About
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Themis was developed as part of a research project in Human-AI Interaction from [ANONYMOUS].<br />
            It is a framework for building human-in-the-loop applications, allowing users to interact with AI models in a controlled and efficient manner.<br />
            The platform is designed to facilitate the collection of human feedback on AI-generated content, enabling the continuous improvement of AI systems.<br />
            Themis is open-source and can be customized to fit various use cases in the field of human-AI interaction.<br />
            It provides a user-friendly interface for both AI developers and human annotators, making it easier to gather insights and improve AI models through human feedback.<br />
            <br />
            The Web application for the crowdsourcing platform was built as part of Final Year Project from [BLANK] for his BSc in Computer Science at [UCD ].<br />
            The project was supervised by [ANONYMOUS] and [ANONYMOUS].<br />
            <br />
            The AI models and training routines were developed by [ANONYMOUS] as part of his Ph.D research in Human-AI interaction.<br /> 
          
          </p>
        </div>
      </section>
    </>
  )
}
