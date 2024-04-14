import { Suspense } from "react"
import Link from "next/link"
import { HelpCircle } from "lucide-react"

import { siteConfig } from "@/config/site"
import { checkRole } from "@/lib/role"
import DefaultNumberOfViewsCard from "@/components/DefaultNumberOfViewsCard"
import NotificationsCard from "@/components/Notifications-card"
import NumberCardSkeleton from "@/components/NumberCardSkeleton"
import VideoTable from "@/components/VideoTable"
import VideoTableSkeleton from "@/components/VideoTableSkeleton"
import Unauthorised from "@/components/unauthorised"
import VideoNumberCard from "@/components/video-number-card"

async function Dev_Page() {
  if (!checkRole("admin") && !checkRole("developer")) {
    return <Unauthorised />
  }
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-1 md:py-10">
        <div className="flex w-full flex-row justify-between gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Developer Page
          </h1>
          <div className="flex flex-row gap-6 items-center">
            <Link href={siteConfig.links.setup}>
              <HelpCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full">
          <Suspense
            fallback={
              <NumberCardSkeleton
                title="Views per Video a"
                description="Default number of views required for a video"
              />
            }
          >
            <DefaultNumberOfViewsCard />
          </Suspense>
          <Suspense
            fallback={
              <NumberCardSkeleton
                title="Videos"
                description="Number of videos you have uploaded to the system"
              />
            }
          >
            <VideoNumberCard />
          </Suspense>
          <Suspense
            fallback={
              <NumberCardSkeleton
                title="Notifications"
                description="Number of notifications sent to users"
              />
            }
          >
            <NotificationsCard />
          </Suspense>
        </div>
      </section>
      <section className="container grid gap-6 pb-8 pt-5 md:py-10">
        <div className="grid gap-4">
          <div className="flex flex-row justify-between">
            <h3 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
              Videos
            </h3>
          </div>
          <Suspense fallback={<VideoTableSkeleton />}>
            <VideoTable />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default Dev_Page
