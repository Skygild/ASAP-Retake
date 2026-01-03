import jwt from "jsonwebtoken";
import { config } from "../configs";
import { JwtPayload, AuthTokens } from "../../types";

class TokenService {
	generateTokens(payload: JwtPayload): AuthTokens {
		const accessToken = jwt.sign(
			payload,
			config.jwt.secret,
			{ expiresIn: config.jwt.expiresIn } as jwt.SignOptions
		);

		const refreshToken = jwt.sign(
			payload,
			config.jwt.secret,
			{ expiresIn: "7d" } as jwt.SignOptions
		);

		return { accessToken, refreshToken };
	}

	verifyToken(token: string): JwtPayload {
		return jwt.verify(token, config.jwt.secret) as JwtPayload;
	}

	decodeToken(token: string): JwtPayload | null {
		try {
			return jwt.decode(token) as JwtPayload;
		} catch {
			return null;
		}
	}
}

export const tokenService = new TokenService();
