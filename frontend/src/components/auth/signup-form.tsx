"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export function SignupForm() {
	const [formData, setFormData] = useState({
		email: "",
		phone: "",
		firstName: "",
		lastName: "",
	})
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const { signup } = useAuth()
	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setIsLoading(true)

		const result = await signup({
			email: formData.email,
			phone: formData.phone,
			firstName: formData.firstName || undefined,
			lastName: formData.lastName || undefined,
		})

		if (result.success) {
			router.push("/dashboard")
		} else {
			setError(result.error || "Signup failed")
		}

		setIsLoading(false)
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Create Account</CardTitle>
				<CardDescription>Enter your details to create a new account</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					{error && (
						<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
							{error}
						</div>
					)}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								name="firstName"
								placeholder="John"
								value={formData.firstName}
								onChange={handleChange}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								name="lastName"
								placeholder="Doe"
								value={formData.lastName}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email *</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone *</Label>
						<Input
							id="phone"
							name="phone"
							type="tel"
							placeholder="+1234567890"
							value={formData.phone}
							onChange={handleChange}
							required
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-4">
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating account..." : "Create Account"}
					</Button>
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link href="/login" className="text-primary hover:underline">
							Sign in
						</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	)
}
