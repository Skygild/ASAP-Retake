import { BookingsList } from "@/components/bookings/bookings-list"

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">View and manage your bookings</p>
			</div>
			<BookingsList />
		</div>
	)
}
