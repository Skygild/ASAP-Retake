import { servicem8Service } from "./servicem8.service";
import { BookingWithActivities, ServiceM8Attachment } from "../../types";

class BookingService {
	async getBookings(companyId: string): Promise<BookingWithActivities[]> {
		const jobs = await servicem8Service.getJobsByCompanyId(companyId);

		if (jobs.length === 0) {
			return [];
		}

		const jobUuids = jobs.map((job) => job.uuid);
		const activitiesMap = await servicem8Service.getScheduledActivitiesForJobs(jobUuids);

		return jobs.map((job) => ({
			job,
			activities: activitiesMap.get(job.uuid) || [],
		}));
	}

	async getBookingDetails(
		jobUuid: string,
		companyId: string
	): Promise<{ job: BookingWithActivities["job"]; activities: BookingWithActivities["activities"] } | null> {
		const job = await servicem8Service.getJobByUuid(jobUuid);

		if (!job) {
			return null;
		}

		if (job.company_uuid !== companyId) {
			throw new Error("FORBIDDEN");
		}

		const activities = await servicem8Service.getJobActivitiesByJobUuid(jobUuid);
		const scheduled = activities.filter((a) => a.activity_was_scheduled === "1");

		return { job, activities: scheduled };
	}

	async getBookingAttachments(
		jobUuid: string,
		companyId: string
	): Promise<ServiceM8Attachment[]> {
		const job = await servicem8Service.getJobByUuid(jobUuid);

		if (!job) {
			throw new Error("NOT_FOUND");
		}

		if (job.company_uuid !== companyId) {
			throw new Error("FORBIDDEN");
		}

		return servicem8Service.getAttachmentsByJobUuid(jobUuid);
	}
}

export const bookingService = new BookingService();
