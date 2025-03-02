import jwt from 'jsonwebtoken'
import { Elysia } from 'elysia'
import { auth, type Payload } from '../auth'
import { env } from '../../env'
import { db } from '../../db/connection'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ headers }) => {
    const { authorization } = headers
    if (!authorization) return {}

    try {
      const { restaurantId } = jwt.verify(
        authorization,
        env.JWT_SECRET_KEY
      ) as Payload

      if (restaurantId == undefined) return {}

      const restaurant = await db.query.restaurants.findFirst({
        where(fields, { eq }) {
          return eq(fields.id, restaurantId)
        },
      })

      if (!restaurant) return {}

      return {
        restaurant,
      }
    } catch (error: any) {
      console.log(error.message)
      return {}
    }
  })
