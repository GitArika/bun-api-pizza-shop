import { pgTable, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const userRoles = pgEnum('user_role', ['manager', 'customer'])

const varcharConfig = {
  length: 255,
}

export const users = pgTable('users', {
  id: varchar('id', varcharConfig)
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', varcharConfig).notNull(),
  email: varchar('email', varcharConfig).notNull().unique(),
  phone: varchar('phone', varcharConfig),
  role: userRoles('role').notNull().default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export type UserTable = typeof users
