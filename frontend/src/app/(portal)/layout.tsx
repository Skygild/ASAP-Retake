"use client"

import { useAuth } from "@/hooks/use-auth"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
	const { isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="space-y-4">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-32" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar />
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</div>
		</div>
	)
}
