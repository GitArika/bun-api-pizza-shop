import { faker } from '@faker-js/faker'
import { Elysia, t } from 'elysia'
import fakeJwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'

import { authLinks } from '../../db/schema'
import { db } from '../../db/connection'
import { auth } from '../auth'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, jwt }) => {
    const { code } = query

    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields, { eq }) {
        return eq(fields.code, code)
      },
    })

    let token: string

    if (authLinkFromCode) {
      const daysSinceAuthLinkWasCreated = dayjs().diff(
        authLinkFromCode.createdAt,
        'days'
      )

      if (daysSinceAuthLinkWasCreated > 7) {
        return
      }

      const managedRestaurant = await db.query.restaurants.findFirst({
        where(fields, { eq }) {
          return eq(fields.managerId, authLinkFromCode.userId)
        },
      })

      token = await jwt.sign({
        sub: authLinkFromCode.userId,
        restaurantId: managedRestaurant?.id,
      })

      await db.delete(authLinks).where(eq(authLinks.code, code))
    } else {
      const fakeSecretKey = faker.string.alphanumeric(32)
      token = fakeJwt.sign(
        {
          sub: 'no-auth',
          restaurantId: '',
        },
        fakeSecretKey,
        { expiresIn: '1h' }
      )
    }

    // redirect(query.redirect, 301)

    return {
      token,
    }
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  }
)
