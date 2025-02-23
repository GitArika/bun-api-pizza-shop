import { pgTable, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const userRoles = pgEnum('user_role', ['manager', 'customer'])

export const users = pgTable('users', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  phone: varchar('phone'),
  role: userRoles('role').notNull().default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export type UserTable = typeof users
