import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";
import { authService } from "../services/auth.service";

class BookingController {
	async getBookings(req: Request, res: Response) {
		try {
			const user = await authService.getCurrentUser(req.user!.userId);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			if (!user.companyId) {
				return res.status(400).json({ error: "No company linked to this account" });
			}

			const bookings = await bookingService.getBookings(user.companyId);

			res.json({ bookings });
		} catch (error) {
			console.error("Get bookings error:", error);
			res.status(500).json({ error: "Failed to get bookings" });
		}
	}

	async getBookingDetails(req: Request, res: Response) {
		try {
			const { jobUuid } = req.params;
			const user = await authService.getCurrentUser(req.user!.userId);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			if (!user.companyId) {
				return res.status(400).json({ error: "No company linked to this account" });
			}

			const booking = await bookingService.getBookingDetails(jobUuid, user.companyId);

			if (!booking) {
				return res.status(404).json({ error: "Booking not found" });
			}

			res.json(booking);
		} catch (error) {
			if (error instanceof Error && error.message === "FORBIDDEN") {
				return res.status(403).json({ error: "Access denied" });
			}
			console.error("Get booking details error:", error);
			res.status(500).json({ error: "Failed to get booking details" });
		}
	}

	async getBookingAttachments(req: Request, res: Response) {
		try {
			const { jobUuid } = req.params;
			const user = await authService.getCurrentUser(req.user!.userId);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			if (!user.companyId) {
				return res.status(400).json({ error: "No company linked to this account" });
			}

			const attachments = await bookingService.getBookingAttachments(jobUuid, user.companyId);

			res.json({
				attachments: attachments.map((a) => ({
					uuid: a.uuid,
					name: a.attachment_name,
					fileType: a.file_type,
					createdDate: a.created_date,
				})),
			});
		} catch (error) {
			if (error instanceof Error && error.message === "NOT_FOUND") {
				return res.status(404).json({ error: "Booking not found" });
			}
			if (error instanceof Error && error.message === "FORBIDDEN") {
				return res.status(403).json({ error: "Access denied" });
			}
			console.error("Get booking attachments error:", error);
			res.status(500).json({ error: "Failed to get attachments" });
		}
	}
}

export const bookingController = new BookingController();
