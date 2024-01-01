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
            Final year project for the BSc in Computer Science at UCD.
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
            Try it out.
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
            Final year project for the BSc in Computer Science at UCD.
          </p>
        </div>
      </section>
    </>
  )
}
