import {LuBrainCog} from "react-icons/lu"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs";

interface NavBarItem {
    name: string,
    link: string
}

const navBarItems: NavBarItem[] = [ 
    {
        name: "Home",
        link: "/",
    },
    {
        name: "HITL",
        link: "/hitl",
    },
    {
        name: "Developer",
        link: "/developer",
    }
]

export default function NavBar(){
    return(
        <nav className="fixed top-0 left-0 min-h-screen w-32 m-0
                        flex flex-col items-center justify-between  
                        bg-purple-800 text-white ">
            <div className="py-5">
                <LuBrainCog size={"2rem"} />
            </div>
            <div className="flex flex-col gap-12 justify-center text-center w-full">
                {navBarItems.map((item, index) => 
                    <Link key={index} href={item.link}>
                        <div className="hover:bg-purple-500 w-full py-10">
                            {item.name}
                        </div>
                    </Link>
                )}
            </div>
            <div className="py-5">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </nav>
    )
}