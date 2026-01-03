export interface SignupRequest {
	email: string;
	phone: string;
	firstName?: string;
	lastName?: string;
}

export interface LoginRequest {
	email?: string;
	phone?: string;
}

export interface JwtPayload {
	userId: string;
	email: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface UserResponse {
	id: string;
	email: string;
	phone: string;
	firstName: string | null;
	lastName: string | null;
	companyId: string | null;
}

export interface ServiceM8CompanyContact {
	uuid: string;
	company_uuid: string;
	first: string;
	last: string;
	email: string;
	mobile: string;
	active: string;
}

export interface ServiceM8Job {
	uuid: string;
	company_uuid: string;
	generated_job_id: string;
	job_address: string;
	job_description: string;
	status: string;
	date: string;
	total: string;
}

export interface ServiceM8JobActivity {
	uuid: string;
	job_uuid: string;
	staff_uuid: string;
	start_date: string;
	end_date: string;
	activity_was_scheduled: string;
}

export interface BookingWithActivities {
	job: ServiceM8Job;
	activities: ServiceM8JobActivity[];
}

export interface ServiceM8Attachment {
	uuid: string;
	related_object_uuid: string;
	attachment_name: string;
	attachment_source: string;
	file_type: string;
	created_date: string;
}
