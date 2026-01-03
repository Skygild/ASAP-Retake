"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { ActivitiesList } from "./activities-list"
import { AttachmentsList } from "./attachments-list"
import type { BookingWithActivities, Attachment } from "@/types/booking"
import { MapPin, DollarSign, Calendar } from "lucide-react"

interface BookingDetailsProps {
	booking: BookingWithActivities
	attachments: Attachment[]
}

const statusColors: Record<string, string> = {
	Quote: "bg-yellow-500",
	"Work Order": "bg-blue-500",
	"In Progress": "bg-purple-500",
	Completed: "bg-green-500",
	Unsuccessful: "bg-red-500",
}

export function BookingDetails({ booking, attachments }: BookingDetailsProps) {
	const { job, activities } = booking

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader className="flex flex-row items-start justify-between space-y-0">
					<div>
						<CardTitle className="text-2xl">Job #{job.generated_job_id}</CardTitle>
						{job.job_description && (
							<p className="mt-2 text-muted-foreground">{job.job_description}</p>
						)}
					</div>
					<Badge className={statusColors[job.status] || "bg-gray-500"}>
						{job.status}
					</Badge>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{job.job_address && (
							<div className="flex items-start gap-2">
								<MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium text-muted-foreground">Address</p>
									<p>{job.job_address}</p>
								</div>
							</div>
						)}
						<div className="flex items-start gap-2">
							<Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium text-muted-foreground">Date</p>
								<p>{job.date ? formatDate(job.date) : "Not set"}</p>
							</div>
						</div>
						{job.total && (
							<div className="flex items-start gap-2">
								<DollarSign className="mt-0.5 h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium text-muted-foreground">Total</p>
									<p>${job.total}</p>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<Separator />

			<ActivitiesList activities={activities} />

			<Separator />

			<AttachmentsList attachments={attachments} />
		</div>
	)
}
