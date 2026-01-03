import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, bookingController.getBookings);
router.get("/:jobUuid", authMiddleware, bookingController.getBookingDetails);
router.get("/:jobUuid/attachments", authMiddleware, bookingController.getBookingAttachments);

export default router;
