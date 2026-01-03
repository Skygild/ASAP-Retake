import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { tokenService } from "./token.service";
import { servicem8Service } from "./servicem8.service";
import { AuthTokens, SignupRequest } from "../../types";

class AuthService {
	async signup(data: SignupRequest): Promise<{ user: User; tokens: AuthTokens }> {
		let companyId: string | null = null;

		try {
			const contactByEmail = await servicem8Service.findContactByEmail(data.email);
			if (contactByEmail) {
				companyId = contactByEmail.company_uuid;
			} else {
				const contactByPhone = await servicem8Service.findContactByPhone(data.phone);
				if (contactByPhone) {
					companyId = contactByPhone.company_uuid;
				}
			}
		} catch (error) {
			console.warn("ServiceM8 lookup failed, proceeding without company link:", error);
		}

		const user = await prisma.user.create({
			data: {
				email: data.email,
				phone: data.phone,
				firstName: data.firstName,
				lastName: data.lastName,
				companyId,
			},
		});

		const tokens = tokenService.generateTokens({
			userId: user.id,
			email: user.email,
		});

		return { user, tokens };
	}

	async loginWithEmail(email: string): Promise<{ user: User; tokens: AuthTokens } | null> {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) return null;

		const tokens = tokenService.generateTokens({
			userId: user.id,
			email: user.email,
		});

		return { user, tokens };
	}

	async loginWithPhone(phone: string): Promise<{ user: User; tokens: AuthTokens } | null> {
		const user = await prisma.user.findUnique({
			where: { phone },
		});

		if (!user) return null;

		const tokens = tokenService.generateTokens({
			userId: user.id,
			email: user.email,
		});

		return { user, tokens };
	}

	async refreshTokens(refreshToken: string): Promise<AuthTokens> {
		const decoded = tokenService.verifyToken(refreshToken);
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		});

		if (!user) {
			throw new Error("User not found");
		}

		return tokenService.generateTokens({
			userId: user.id,
			email: user.email,
		});
	}

	async getCurrentUser(userId: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { id: userId },
		});
	}

	async emailExists(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });
		return !!user;
	}

	async phoneExists(phone: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { phone } });
		return !!user;
	}
}

export const authService = new AuthService();
