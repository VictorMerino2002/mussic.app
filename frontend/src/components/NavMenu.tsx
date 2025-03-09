import { useAudio } from "@/app/AudioProvider"
import { theme } from "@/app/config";
import Link from "next/link"
import { GoHomeFill } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { RiPlayListFill } from "react-icons/ri";

export default function NavMenu() {

    const { setMaximized } = useAudio();

    return (
        <nav className="w-full h-16 flex justify-around items-center fixed bottom-0 left-0 z-50" style={{background: theme.bg}}>
            <Link onClick={() => setMaximized(false)} href="/"><GoHomeFill size={30}/></Link>
            <Link onClick={() => setMaximized(false)} href="/search"><IoMdSearch size={30}/></Link> 
            <Link onClick={() => setMaximized(false)} href="/"><RiPlayListFill size={30}/></Link>             
        </nav>
    )
}