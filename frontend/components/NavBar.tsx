import {LuBrainCog} from "react-icons/lu"
import {MdAccountBox} from "react-icons/md"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs";

interface NavBarItem {
    name: string,
    link: string
}

const navBarItems: NavBarItem[] = [ 
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Account",
        link: "/account"
    }
]



export default function NavBar(){
    return(
        <nav className="flex flex-row justify-between items-center p-8 bg-electric-purple text-white">
            <LuBrainCog size={"2rem"} />
            <ul className="flex flex-row gap-8 items-center">
                {navBarItems.map((item, index) => 
                    <Link href={item.link}>
                        <li key={index} className="p-1 rounded-full hover:bg-electric-yellow hover:cursor-pointer">
                            {item.name}
                        </li>
                    </Link>
                )}
                <li>
                    <UserButton afterSignOutUrl="/"/>
                </li>
            </ul>
        </nav>
    )
}