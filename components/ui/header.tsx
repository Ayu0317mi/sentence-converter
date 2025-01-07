//header.tsx
import Link from "next/link";
import { Logo } from "./logo";


export function Header() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Logo />
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                    English
                </Link>
                <Link href="/japanese" className="text-sm font-medium hover:underline underline-offset-4">
                    Japanese
                </Link>
                <Link href="/test" className="text-sm font-medium hover:underline underline-offset-4">
                    Llama 
                </Link>
            </nav>
        </header>
    );
}

export default Header;