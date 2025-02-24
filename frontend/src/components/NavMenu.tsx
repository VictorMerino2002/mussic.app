import Link from "next/link"

export default function NavMenu() {
    return (
        <nav className="w-full h-16 flex justify-around items-center fixed bottom-0 bg-black">
            <Link href="/">Home</Link>
            <Link href="/search">Search</Link> 
        </nav>
    )
}