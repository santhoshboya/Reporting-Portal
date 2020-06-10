import { AuthAPI } from '../services/AuthService/AuthAPI'
import { AuthFixtureService } from '../services/AuthService/AuthFixtureService'
import { AuthStore } from './AuthStore'
const authAPI = new AuthAPI()
const authService = new AuthFixtureService()
const authStore = new AuthStore(authService)
export default { authStore }
