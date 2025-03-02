import { authenticateFromLink } from './authenticate-from-link'
import { getManagedRestaurant } from './get-managed-restaurant'
import { getProfile } from './get-profile'
import { registerRestaurant } from './register-restaurant'
import { sendAuthLink } from './send-auth-link'
import { signOut } from './sign-out'

export const routes = [
  registerRestaurant,
  sendAuthLink,
  authenticateFromLink,
  signOut,
  getProfile,
  getManagedRestaurant,
]
