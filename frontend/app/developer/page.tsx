  
"use client"
import EditableNumberCard from "@/components/editable-number-card"
import NumberCard from "@/components/number-card"
import { DataTable } from "./data-table" 
import { columns } from "./columns"
import { Settings } from "lucide-react"
import Link from "next/link"
import { useUserData } from "@/providers/user-context"
import RefreshButton from "@/components/refreshButton"
import { testVideos } from "@/lib/test-data"

export default function Developer() {
    const { userData: { videos }, refreshData} = useUserData();
    console.log(videos);
    return (
        <>
        <section className="container grid items-center gap-6 pb-8 pt-1 md:py-10">
            <div className="flex w-full flex-row justify-between gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Developer Page
                </h1>
                <div className="flex flex-row gap-6 items-center">
                    <Link href="/developer/set-up">
                        <Settings className="h-6 w-6" />
                    </Link>
                    <RefreshButton refresh={refreshData}/>
                </div>
            </div>
        </section>
        <section className="container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full">
                <EditableNumberCard 
                    title="Views per Video"
                    number={3}
                    description={"How many times each video needs to be viewed before preference is collected."}
                    className="col-span-1"
                    min={1}
                    max={10}
                />
                <NumberCard 
                    title="Videos"
                    number={videos ? videos.length : 0}
                    description={"Number of videos uploaded to the system."}
                    min={0}
                    max={1000}

                />
                <NumberCard 
                    title="Notifications sent"
                    number={100}
                    description={"Number of Notifications sent to users."}
                    min={1}
                    max={10}
                />
            </div>
        </section>
        <section className="container grid gap-6 pb-8 pt-5 md:py-10">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
                <div className="grid gap-4">
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
                        Videos
                    </h3>
                    <DataTable columns={columns} data={testVideos} />
                </div>
                <div className="grid gap-4">
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
                        Videos
                    </h3>
                </div>
            </div>
        </section>
        </>
    )
}