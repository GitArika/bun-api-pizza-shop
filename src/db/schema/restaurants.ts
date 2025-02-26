import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { users } from './users'
import { relations } from 'drizzle-orm'

const varcharConfig = {
  length: 255,
}

export const restaurants = pgTable('restaurants', {
  id: varchar('id', varcharConfig)
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', varcharConfig).notNull(),
  description: varchar('decription', varcharConfig),
  managerId: varchar('manager_id', varcharConfig).references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const restaurantsRelations = relations(restaurants, ({ one }) => {
  return {
    manager: one(users, {
      fields: [restaurants.managerId],
      references: [users.id],
      relationName: 'restaurant_manager',
    }),
  }
})

export type RetaurantsTable = typeof restaurants
