"use client"

import Link from "next/link"
import { UserMenu } from "./user-menu"

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between px-4">
				<Link href="/dashboard" className="flex items-center space-x-2">
					<span className="font-bold">Customer Portal</span>
				</Link>
				<UserMenu />
			</div>
		</header>
	)
}
