"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard } from "lucide-react"

const navItems = [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]

export function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="hidden w-64 flex-col border-r bg-background md:flex">
			<nav className="flex-1 space-y-1 p-4">
				{navItems.map((item) => {
					const Icon = item.icon
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
								pathname === item.href
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							)}
						>
							<Icon className="h-4 w-4" />
							{item.label}
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
