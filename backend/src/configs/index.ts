import dotenv from "dotenv";
dotenv.config();

export const config = {
	env: process.env.NODE_ENV || "development",
	port: parseInt(process.env.PORT || "3001", 10),

	database: {
		url: process.env.DATABASE_URL || "",
	},

	jwt: {
		secret: process.env.JWT_SECRET || "development-secret",
		expiresIn: process.env.JWT_EXPIRES_IN || "24h",
	},

	servicem8: {
		apiKey: process.env.SERVICEM8_API_KEY || "",
		baseUrl: "https://api.servicem8.com/api_1.0",
	},

	cors: {
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
	},

	logging: {
		level: process.env.LOG_LEVEL || "info",
	},
} as const;
