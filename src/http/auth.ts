import { Elysia, t, type Static } from 'elysia'
import { jwt } from '@elysiajs/jwt'

import { env } from '../env'
import { UnauthorizedError } from './errors/unauthorized-error'

export const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export type Payload = Static<typeof jwtPayload>

export const auth = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return { code, message: error.message }
    }
  })
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    })
  )
  .derive(({ jwt }) => {
    return {
      signUser: async (payload: Payload) => {
        const token = await jwt.sign(payload)

        return {
          token,
        }
      },

      signOut: () => {
        return {
          signOut: true, // removeCookie('auth)
        }
      },

      getCurrentuser: async () => {
        const authCookie = '' // cookie.auth

        const payload = await jwt.verify(authCookie)

        if (!payload) throw new UnauthorizedError()

        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
    }
  })
