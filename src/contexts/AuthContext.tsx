import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as AuthSession from "expo-auth-session"

import { api } from "../services/api"

const SCOPE = "read:user"
const CLIENT_ID = "793cb7ae35c92075a011"

const USER_STORAGE = "@nlwheat:user"
const TOKEN_STORAGE = "@nlwheat:token"

type User = {
  id: string
  name: string
  login: string
  avatar_url: string
}

type AuthContextData = {
  user: User | null
  isSigningIn: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthResponse = {
  token: string
  user: User
}

type AuthorizationResponse = {
  type?: string
  params: {
    code?: string
    error?: string
  }
}

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    async function loadUserStorage() {
      setIsSigningIn(true)

      const user = await AsyncStorage.getItem(USER_STORAGE)
      const token = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (user && token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`
        setUser(JSON.parse(user))
      }

      setIsSigningIn(false)
    }

    loadUserStorage()
  }, [])

  async function signIn() {
    try {
      setIsSigningIn(true)

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
      const { params, type } = (await AuthSession.startAsync({
        authUrl
      })) as AuthorizationResponse

      if (type === "success" && params.error !== "access_denied") {
        const response = await api.post("/authenticate", { code: params.code })
        const { token, user } = response.data as AuthResponse

        api.defaults.headers.common.authorization = `Bearer ${token}`
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, token)

        setUser(user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSigningIn(false)
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)

    setUser(null)
  }

  const value: AuthContextData = {
    user,
    signIn,
    signOut,
    isSigningIn
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
