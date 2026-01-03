"use client"

import { use } from "react"
import Link from "next/link"
import { useBookingDetail } from "@/hooks/use-bookings"
import { BookingDetails } from "@/components/bookings/booking-details"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, AlertCircle } from "lucide-react"

interface BookingPageProps {
	params: Promise<{ jobUuid: string }>
}

export default function BookingPage({ params }: BookingPageProps) {
	const { jobUuid } = use(params)
	const { booking, attachments, isLoading, error } = useBookingDetail(jobUuid)

	if (isLoading) {
		return (
			<div className="space-y-6">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-64 w-full" />
				<Skeleton className="h-48 w-full" />
			</div>
		)
	}

	if (error || !booking) {
		return (
			<div className="space-y-4">
				<div className="flex items-center gap-2 rounded-md bg-destructive/15 p-4 text-destructive">
					<AlertCircle className="h-5 w-5" />
					{error || "Booking not found"}
				</div>
				<Button asChild>
					<Link href="/dashboard">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Dashboard
					</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button variant="outline" asChild>
					<Link href="/dashboard">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back
					</Link>
				</Button>
				<h1 className="text-3xl font-bold">Booking Details</h1>
			</div>
			<BookingDetails booking={booking} attachments={attachments} />
		</div>
	)
}
