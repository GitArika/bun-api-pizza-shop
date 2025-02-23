import { faker } from '@faker-js/faker'
import chalk from 'chalk'

import { users, restaurants } from './schema'
import { db } from './connection'

/**
 * Reset database
 */
await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('✓ Database reset!'))

/**
 * Create customers
 */
await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalk.yellow('✓ Customers created!'))

/**
 * Create Manager
 */
const [managerSeed] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({ id: users.id })

console.log(chalk.yellow('✓ Manager created!'))

/**
 * Create restaurant
 */
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: managerSeed.id,
  },
])

console.log(chalk.yellow('✓ Restaurants created!'))

console.log(chalk.greenBright('✓ Database seeded successfully!'))

process.exit()
