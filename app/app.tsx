"use client";
import Link from "next/link";

export default function App() {
    return (<Link href={'/search/all'} className="text-blue-500 hover:text-blue-700 cursor-pointer">
        Search
    </Link>);
}
