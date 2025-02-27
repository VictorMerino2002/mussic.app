import { useAudio } from "@/app/AudioProvider"
import Link from "next/link"

export default function NavMenu() {

    const { setMaximized } = useAudio();

    return (
        <nav className="w-full h-16 flex justify-around items-center fixed bottom-0 left-0 bg-black z-50">
            <Link onClick={() => setMaximized(false)} href="/">Home</Link>
            <Link onClick={() => setMaximized(false)} href="/search">Search</Link> 
        </nav>
    )
}