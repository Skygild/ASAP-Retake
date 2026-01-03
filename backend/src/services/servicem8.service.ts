import axios from "axios";
import { config } from "../configs";
import {
	ServiceM8CompanyContact,
	ServiceM8Job,
	ServiceM8JobActivity,
	ServiceM8Attachment,
} from "../../types";

class ServiceM8Service {
	private apiUrl = config.servicem8.baseUrl;
	private apiKey = config.servicem8.apiKey;

	private getAuthHeader() {
		const credentials = Buffer.from(`${this.apiKey}:x`).toString("base64");
		return `Basic ${credentials}`;
	}

	async getCompanyContacts(): Promise<ServiceM8CompanyContact[]> {
		const response = await axios.get<ServiceM8CompanyContact[]>(
			`${this.apiUrl}/companycontact.json`,
			{
				headers: { Authorization: this.getAuthHeader() },
			}
		);
		return response.data;
	}

	async findContactByEmail(email: string): Promise<ServiceM8CompanyContact | null> {
		const contacts = await this.getCompanyContacts();
		return (
			contacts.find((c) => c.email?.toLowerCase() === email.toLowerCase()) || null
		);
	}

	async findContactByPhone(phone: string): Promise<ServiceM8CompanyContact | null> {
		const contacts = await this.getCompanyContacts();
		const normalizedPhone = phone.replace(/\D/g, "");
		return (
			contacts.find((c) => c.mobile?.replace(/\D/g, "") === normalizedPhone) || null
		);
	}

	async getJobByUuid(jobUuid: string): Promise<ServiceM8Job | null> {
		try {
			const response = await axios.get<ServiceM8Job>(
				`${this.apiUrl}/job/${jobUuid}.json`,
				{
					headers: { Authorization: this.getAuthHeader() },
				}
			);
			return response.data;
		} catch {
			return null;
		}
	}

	async getJobsByCompanyId(companyId: string): Promise<ServiceM8Job[]> {
		const response = await axios.get<ServiceM8Job[]>(`${this.apiUrl}/job.json`, {
			headers: { Authorization: this.getAuthHeader() },
			params: {
				$filter: `company_uuid eq '${companyId}'`,
			},
		});
		return response.data;
	}

	async getJobActivitiesByJobUuid(jobUuid: string): Promise<ServiceM8JobActivity[]> {
		const response = await axios.get<ServiceM8JobActivity[]>(
			`${this.apiUrl}/jobactivity.json`,
			{
				headers: { Authorization: this.getAuthHeader() },
				params: {
					$filter: `job_uuid eq '${jobUuid}'`,
				},
			}
		);
		return response.data;
	}

	async getScheduledActivitiesForJobs(
		jobUuids: string[]
	): Promise<Map<string, ServiceM8JobActivity[]>> {
		const activitiesMap = new Map<string, ServiceM8JobActivity[]>();

		await Promise.all(
			jobUuids.map(async (jobUuid) => {
				const activities = await this.getJobActivitiesByJobUuid(jobUuid);
				const scheduled = activities.filter((a) => a.activity_was_scheduled === "1");
				activitiesMap.set(jobUuid, scheduled);
			})
		);

		return activitiesMap;
	}

	async getAttachmentsByJobUuid(jobUuid: string): Promise<ServiceM8Attachment[]> {
		const response = await axios.get<ServiceM8Attachment[]>(
			`${this.apiUrl}/attachment.json`,
			{
				headers: { Authorization: this.getAuthHeader() },
				params: {
					$filter: `related_object_uuid eq '${jobUuid}'`,
				},
			}
		);
		return response.data;
	}
}

export const servicem8Service = new ServiceM8Service();
