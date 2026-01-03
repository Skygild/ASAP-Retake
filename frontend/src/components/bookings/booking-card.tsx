"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { BookingWithActivities } from "@/types/booking"
import { MapPin, Calendar } from "lucide-react"

interface BookingCardProps {
	booking: BookingWithActivities
}

const statusColors: Record<string, string> = {
	Quote: "bg-yellow-500",
	"Work Order": "bg-blue-500",
	"In Progress": "bg-purple-500",
	Completed: "bg-green-500",
	Unsuccessful: "bg-red-500",
}

export function BookingCard({ booking }: BookingCardProps) {
	const { job, activities } = booking

	return (
		<Link href={`/bookings/${job.uuid}`}>
			<Card className="transition-shadow hover:shadow-md">
				<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
					<CardTitle className="text-lg">#{job.generated_job_id}</CardTitle>
					<Badge className={statusColors[job.status] || "bg-gray-500"}>{job.status}</Badge>
				</CardHeader>
				<CardContent>
					{job.job_description && (
						<p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
							{job.job_description}
						</p>
					)}
					<div className="space-y-2 text-sm">
						{job.job_address && (
							<div className="flex items-center gap-2 text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span className="line-clamp-1">{job.job_address}</span>
							</div>
						)}
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Calendar className="h-4 w-4" />
								<span>{job.date ? formatDate(job.date) : "No date set"}</span>
							</div>
							<span className="text-muted-foreground">
								{activities.length} {activities.length === 1 ? "activity" : "activities"}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
