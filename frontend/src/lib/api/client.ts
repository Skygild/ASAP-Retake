import { API_BASE_URL, AUTH_TOKEN_KEY } from "@/lib/constants"
import type { ApiResponse, ApiError } from "@/types/api"
import type { Tokens } from "@/types/auth"

export function getStoredTokens(): Tokens | null {
	if (typeof window === "undefined") return null
	const stored = localStorage.getItem(AUTH_TOKEN_KEY)
	return stored ? JSON.parse(stored) : null
}

export function setStoredTokens(tokens: Tokens): void {
	localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(tokens))
	document.cookie = `${AUTH_TOKEN_KEY}=${JSON.stringify(tokens)}; path=/; max-age=604800`
}

export function clearStoredTokens(): void {
	localStorage.removeItem(AUTH_TOKEN_KEY)
	document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0`
}

async function refreshAccessToken(): Promise<string | null> {
	const tokens = getStoredTokens()
	if (!tokens?.refreshToken) return null

	try {
		const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken: tokens.refreshToken }),
		})

		if (!response.ok) {
			clearStoredTokens()
			return null
		}

		const data = await response.json()
		setStoredTokens(data)
		return data.accessToken
	} catch {
		clearStoredTokens()
		return null
	}
}

export async function apiClient<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<ApiResponse<T>> {
	const tokens = getStoredTokens()

	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...options.headers,
	}

	if (tokens?.accessToken) {
		;(headers as Record<string, string>)["Authorization"] = `Bearer ${tokens.accessToken}`
	}

	try {
		let response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers,
		})

		if (response.status === 401 && tokens?.refreshToken) {
			const newAccessToken = await refreshAccessToken()
			if (newAccessToken) {
				;(headers as Record<string, string>)["Authorization"] = `Bearer ${newAccessToken}`
				response = await fetch(`${API_BASE_URL}${endpoint}`, {
					...options,
					headers,
				})
			}
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			return {
				data: null,
				error: {
					message: errorData.error || errorData.message || "An error occurred",
					statusCode: response.status,
					errors: errorData.errors,
				},
			}
		}

		const data = await response.json()
		return { data, error: null }
	} catch (err) {
		return {
			data: null,
			error: {
				message: err instanceof Error ? err.message : "Network error",
				statusCode: 0,
			},
		}
	}
}
