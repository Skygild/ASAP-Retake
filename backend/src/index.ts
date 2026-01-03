import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./configs";
import authRoutes from "./routes/auth.route";
import bookingRoutes from "./routes/booking.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`);
});
