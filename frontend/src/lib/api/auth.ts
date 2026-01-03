import { apiClient, setStoredTokens, clearStoredTokens } from "./client"
import { API_ENDPOINTS } from "@/lib/constants"
import type { AuthResponse, SignupRequest, LoginRequest, User } from "@/types/auth"
import type { ApiResponse } from "@/types/api"

export async function signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
	const response = await apiClient<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, {
		method: "POST",
		body: JSON.stringify(data),
	})

	if (response.data) {
		setStoredTokens(response.data.tokens)
	}

	return response
}

export async function login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
	const response = await apiClient<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
		method: "POST",
		body: JSON.stringify(data),
	})

	if (response.data) {
		setStoredTokens(response.data.tokens)
	}

	return response
}

export async function getMe(): Promise<ApiResponse<User>> {
	return apiClient<User>(API_ENDPOINTS.AUTH.ME)
}

export async function logout(): Promise<ApiResponse<{ message: string }>> {
	const response = await apiClient<{ message: string }>(API_ENDPOINTS.AUTH.LOGOUT, {
		method: "POST",
	})
	clearStoredTokens()
	return response
}
