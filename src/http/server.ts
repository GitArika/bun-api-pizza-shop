import { Elysia } from 'elysia'

import { routes } from './routes'

const app = new Elysia().use(routes)

app.get('/health-check', () => {
  return 'API Online 🚀'
})

app.listen(3333, () => {
  console.log('Server is running on port 3333 🚀')
})
