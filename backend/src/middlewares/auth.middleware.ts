import { Request, Response, NextFunction } from "express";
import { tokenService } from "../services/token.service";
import { JwtPayload } from "../../types";

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ error: "No token provided" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = tokenService.verifyToken(token);

		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
};
