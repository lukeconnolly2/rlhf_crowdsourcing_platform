import {LuBrainCog} from "react-icons/lu"
import {MdAccountBox} from "react-icons/md"
import Link from "next/link"

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
        <nav className="flex flex-row justify-between items-center p-5 bg-dark-background text-white">
            <LuBrainCog size={"2rem"} />
            <ul className="flex flex-row gap-8 items-center">
                {navBarItems.map((item, index) => 
                    <Link href={item.link}>
                        <li key={index} className="p-1 rounded-full hover:bg-background hover:cursor-pointer">
                            {item.name}
                        </li>
                    </Link>
                )}
                <li>
                    <Link href="/signout">
                        <MdAccountBox size={"2rem"} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}