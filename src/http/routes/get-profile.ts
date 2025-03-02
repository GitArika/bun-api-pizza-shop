import jwt from 'jsonwebtoken'
import { Elysia } from 'elysia'
import { auth, type Payload } from '../auth'
import { env } from '../../env'
import { db } from '../../db/connection'

export const getProfile = new Elysia()
  .use(auth)
  .get('/me', async ({ headers }) => {
    const { authorization } = headers
    if (!authorization) return {}

    try {
      const payload = jwt.verify(authorization, env.JWT_SECRET_KEY) as Payload

      const user = await db.query.users.findFirst({
        where(fields, { eq }) {
          return eq(fields.id, payload.sub)
        },
      })

      if (!user) return {}

      return {
        user,
      }
    } catch (error: any) {
      console.log(error.message)
      return {}
    }
  })
