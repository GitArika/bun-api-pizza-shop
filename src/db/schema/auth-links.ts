import { createId } from '@paralleldrive/cuid2'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

const varcharConfig = {
  length: 255,
}

export const authLinks = pgTable('auth_links', {
  id: varchar('id', varcharConfig)
    .primaryKey()
    .$defaultFn(() => createId()),
  code: varchar('code', varcharConfig).notNull().unique(),
  userId: varchar('user_id', varcharConfig)
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
