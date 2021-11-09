import axios from "axios"
import { BASE_URL } from "react-native-dotenv"

export const api = axios.create({
  baseURL: BASE_URL
})
