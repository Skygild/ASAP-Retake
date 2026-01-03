"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { getStoredTokens, clearStoredTokens } from "@/lib/api/client"
import * as authApi from "@/lib/api/auth"
import type { User, Tokens, SignupRequest, LoginRequest } from "@/types/auth"

interface AuthContextValue {
	user: User | null
	tokens: Tokens | null
	isAuthenticated: boolean
	isLoading: boolean
	signup: (data: SignupRequest) => Promise<{ success: boolean; error?: string }>
	login: (data: LoginRequest) => Promise<{ success: boolean; error?: string }>
	logout: () => Promise<void>
	refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [tokens, setTokens] = useState<Tokens | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const isAuthenticated = !!user && !!tokens

	const refreshUser = useCallback(async () => {
		const storedTokens = getStoredTokens()
		if (!storedTokens) {
			setIsLoading(false)
			return
		}

		setTokens(storedTokens)
		const response = await authApi.getMe()

		if (response.data) {
			setUser(response.data)
		} else {
			clearStoredTokens()
			setUser(null)
			setTokens(null)
		}

		setIsLoading(false)
	}, [])

	useEffect(() => {
		refreshUser()
	}, [refreshUser])

	const signup = async (data: SignupRequest) => {
		const response = await authApi.signup(data)

		if (response.data) {
			setUser(response.data.user)
			setTokens(response.data.tokens)
			return { success: true }
		}

		return { success: false, error: response.error?.message }
	}

	const login = async (data: LoginRequest) => {
		const response = await authApi.login(data)

		if (response.data) {
			setUser(response.data.user)
			setTokens(response.data.tokens)
			return { success: true }
		}

		return { success: false, error: response.error?.message }
	}

	const logout = async () => {
		await authApi.logout()
		setUser(null)
		setTokens(null)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				tokens,
				isAuthenticated,
				isLoading,
				signup,
				login,
				logout,
				refreshUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthContext() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider")
	}
	return context
}
