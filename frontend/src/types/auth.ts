export interface User {
	id: string
	email: string
	phone: string
	firstName: string | null
	lastName: string | null
	companyId: string | null
}

export interface Tokens {
	accessToken: string
	refreshToken: string
}

export interface AuthState {
	user: User | null
	tokens: Tokens | null
	isAuthenticated: boolean
	isLoading: boolean
}

export interface SignupRequest {
	email: string
	phone: string
	firstName?: string
	lastName?: string
}

export interface LoginRequest {
	email?: string
	phone?: string
}

export interface AuthResponse {
	user: User
	tokens: Tokens
}
