export interface Job {
	uuid: string
	company_uuid: string
	generated_job_id: string
	job_address: string
	job_description: string
	status: string
	date: string
	total: string
}

export interface Activity {
	uuid: string
	job_uuid: string
	staff_uuid: string
	start_date: string
	end_date: string
	activity_was_scheduled: string
}

export interface Attachment {
	uuid: string
	name: string
	fileType: string
	createdDate: string
}

export interface BookingWithActivities {
	job: Job
	activities: Activity[]
}

export interface BookingsResponse {
	bookings: BookingWithActivities[]
}

export interface BookingDetailResponse {
	job: Job
	activities: Activity[]
}

export interface AttachmentsResponse {
	attachments: Attachment[]
}
