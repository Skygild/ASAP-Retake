import { apiClient } from "./client"
import { API_ENDPOINTS } from "@/lib/constants"
import type { BookingsResponse, BookingDetailResponse, AttachmentsResponse } from "@/types/booking"
import type { ApiResponse } from "@/types/api"

export async function getBookings(): Promise<ApiResponse<BookingsResponse>> {
	return apiClient<BookingsResponse>(API_ENDPOINTS.BOOKINGS.LIST)
}

export async function getBookingDetail(jobUuid: string): Promise<ApiResponse<BookingDetailResponse>> {
	return apiClient<BookingDetailResponse>(API_ENDPOINTS.BOOKINGS.DETAIL(jobUuid))
}

export async function getBookingAttachments(jobUuid: string): Promise<ApiResponse<AttachmentsResponse>> {
	return apiClient<AttachmentsResponse>(API_ENDPOINTS.BOOKINGS.ATTACHMENTS(jobUuid))
}
