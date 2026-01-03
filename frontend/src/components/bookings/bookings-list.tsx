"use client"

import { useBookings } from "@/hooks/use-bookings"
import { BookingCard } from "./booking-card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Calendar } from "lucide-react"

export function BookingsList() {
	const { bookings, isLoading, error } = useBookings()

	if (isLoading) {
		return (
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<Skeleton key={i} className="h-48 rounded-lg" />
				))}
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex items-center gap-2 rounded-md bg-destructive/15 p-4 text-destructive">
				<AlertCircle className="h-5 w-5" />
				{error}
			</div>
		)
	}

	if (bookings.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
				<p className="text-lg font-medium">No bookings found</p>
				<p className="text-muted-foreground">Your bookings will appear here</p>
			</div>
		)
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{bookings.map((booking) => (
				<BookingCard key={booking.job.uuid} booking={booking} />
			))}
		</div>
	)
}
