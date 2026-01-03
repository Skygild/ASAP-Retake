import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { LoginRequest, SignupRequest } from "../../types";

class AuthController {
	async signup(req: Request, res: Response) {
		try {
			const { email, phone, firstName, lastName } = req.body as SignupRequest;

			if (!email || !phone) {
				return res.status(400).json({ error: "Email and phone are required" });
			}

			const emailExists = await authService.emailExists(email);
			if (emailExists) {
				return res.status(409).json({ error: "Email already registered" });
			}

			const phoneExists = await authService.phoneExists(phone);
			if (phoneExists) {
				return res.status(409).json({ error: "Phone already registered" });
			}

			const result = await authService.signup({ email, phone, firstName, lastName });

			res.status(201).json({
				user: {
					id: result.user.id,
					email: result.user.email,
					phone: result.user.phone,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					companyId: result.user.companyId,
				},
				tokens: result.tokens,
			});
		} catch (error) {
			console.error("Signup error:", error);
			console.error("Signup error message:", (error as any)?.message);
			console.error("Signup error stack:", (error as any)?.stack);
			res.status(500).json({ error: "Signup failed" });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { email, phone } = req.body as LoginRequest;

			if (!email && !phone) {
				return res.status(400).json({ error: "Email or phone required" });
			}

			let result;
			if (email) {
				result = await authService.loginWithEmail(email);
			} else if (phone) {
				result = await authService.loginWithPhone(phone);
			}

			if (!result) {
				return res.status(401).json({ error: "User not found" });
			}

			res.json({
				user: {
					id: result.user.id,
					email: result.user.email,
					phone: result.user.phone,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					companyId: result.user.companyId,
				},
				tokens: result.tokens,
			});
		} catch (error) {
			console.error("Login error:", error);
			res.status(500).json({ error: "Login failed" });
		}
	}

	async refresh(req: Request, res: Response) {
		try {
			const { refreshToken } = req.body;

			if (!refreshToken) {
				return res.status(400).json({ error: "Refresh token required" });
			}

			const tokens = await authService.refreshTokens(refreshToken);
			res.json(tokens);
		} catch (error) {
			console.error("Refresh error:", error);
			res.status(401).json({ error: "Invalid refresh token" });
		}
	}

	async me(req: Request, res: Response) {
		try {
			const user = await authService.getCurrentUser(req.user!.userId);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			res.json({
				id: user.id,
				email: user.email,
				phone: user.phone,
				firstName: user.firstName,
				lastName: user.lastName,
				companyId: user.companyId,
			});
		} catch (error) {
			console.error("Get user error:", error);
			res.status(500).json({ error: "Failed to get user" });
		}
	}

	async logout(_req: Request, res: Response) {
		res.json({ message: "Logged out successfully" });
	}
}

export const authController = new AuthController();
