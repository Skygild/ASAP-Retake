"use client"

import { useState, useEffect, useCallback } from "react"
import * as bookingsApi from "@/lib/api/bookings"
import type { BookingWithActivities, Attachment } from "@/types/booking"

export function useBookings() {
	const [bookings, setBookings] = useState<BookingWithActivities[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchBookings = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		const response = await bookingsApi.getBookings()

		if (response.data) {
			setBookings(response.data.bookings)
		} else {
			setError(response.error?.message || "Failed to fetch bookings")
		}

		setIsLoading(false)
	}, [])

	useEffect(() => {
		fetchBookings()
	}, [fetchBookings])

	return { bookings, isLoading, error, refetch: fetchBookings }
}

export function useBookingDetail(jobUuid: string) {
	const [booking, setBooking] = useState<BookingWithActivities | null>(null)
	const [attachments, setAttachments] = useState<Attachment[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchBookingDetail = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		const [bookingResponse, attachmentsResponse] = await Promise.all([
			bookingsApi.getBookingDetail(jobUuid),
			bookingsApi.getBookingAttachments(jobUuid),
		])

		if (bookingResponse.data) {
			setBooking({
				job: bookingResponse.data.job,
				activities: bookingResponse.data.activities,
			})
		} else {
			setError(bookingResponse.error?.message || "Failed to fetch booking")
		}

		if (attachmentsResponse.data) {
			setAttachments(attachmentsResponse.data.attachments)
		}

		setIsLoading(false)
	}, [jobUuid])

	useEffect(() => {
		fetchBookingDetail()
	}, [fetchBookingDetail])

	return { booking, attachments, isLoading, error, refetch: fetchBookingDetail }
}
