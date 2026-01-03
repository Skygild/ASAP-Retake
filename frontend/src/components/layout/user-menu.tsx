"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function UserMenu() {
	const { user, logout } = useAuth()
	const router = useRouter()

	const handleLogout = async () => {
		await logout()
		router.push("/login")
	}

	return (
		<div className="flex items-center gap-4">
			<span className="text-sm text-muted-foreground">
				{user?.firstName || user?.email}
			</span>
			<Button variant="outline" size="sm" onClick={handleLogout}>
				<LogOut className="mr-2 h-4 w-4" />
				Logout
			</Button>
		</div>
	)
}
