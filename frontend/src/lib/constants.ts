export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export const API_ENDPOINTS = {
	AUTH: {
		SIGNUP: "/api/auth/signup",
		LOGIN: "/api/auth/login",
		REFRESH: "/api/auth/refresh",
		ME: "/api/auth/me",
		LOGOUT: "/api/auth/logout",
	},
	BOOKINGS: {
		LIST: "/api/bookings",
		DETAIL: (jobUuid: string) => `/api/bookings/${jobUuid}`,
		ATTACHMENTS: (jobUuid: string) => `/api/bookings/${jobUuid}/attachments`,
	},
} as const

export const AUTH_TOKEN_KEY = "auth_tokens"
export const PUBLIC_ROUTES = ["/login", "/signup", "/"]
export const PROTECTED_ROUTES = ["/dashboard", "/bookings"]
