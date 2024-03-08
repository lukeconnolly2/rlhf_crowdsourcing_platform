import { Suspense } from "react"

import { checkRole } from "@/lib/role"
import VideoTableSkeleton from "@/components/VideoTableSkeleton"
import Unauthorised from "@/components/unauthorised"

import AdminDataTable from "./AdminDataTable"

export default async function AdminDashboard() {
  if (!checkRole("admin")) {
    return <Unauthorised />
  }

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-1 md:py-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Admin Page
        </h1>
        <Suspense fallback={<VideoTableSkeleton />}>
          <AdminDataTable />
        </Suspense>
      </section>
    </>
  )
}
