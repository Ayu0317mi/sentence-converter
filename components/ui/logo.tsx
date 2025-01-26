import Link from "next/link";
import { LuNotebookPen } from "react-icons/lu";


export function Logo() {

    return (
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <LuNotebookPen className="text-2xl" />
        <span className="className=text-lg font-semibold">PhraseFlip</span>
    </Link>
    );

}