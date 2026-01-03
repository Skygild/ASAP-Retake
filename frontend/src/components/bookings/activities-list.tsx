"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateTime } from "@/lib/utils"
import type { Activity } from "@/types/booking"
import { Clock } from "lucide-react"

interface ActivitiesListProps {
	activities: Activity[]
}

export function ActivitiesList({ activities }: ActivitiesListProps) {
	if (activities.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Scheduled Activities</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">No scheduled activities yet</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Scheduled Activities ({activities.length})</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="relative space-y-4">
					<div className="absolute left-2 top-0 h-full w-0.5 bg-border" />
					{activities.map((activity) => (
						<div key={activity.uuid} className="relative pl-8">
							<div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">
										{formatDateTime(activity.start_date)}
									</span>
								</div>
								{activity.end_date && (
									<p className="text-sm text-muted-foreground">
										End: {formatDateTime(activity.end_date)}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
