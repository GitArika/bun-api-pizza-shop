import { authenticateFromLink } from './authenticate-from-link'
import { registerRestaurant } from './register-restaurant'
import { sendAuthLink } from './send-auth-link'

export const routes = [registerRestaurant, sendAuthLink, authenticateFromLink]
