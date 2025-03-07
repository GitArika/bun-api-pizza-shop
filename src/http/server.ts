import { Elysia } from 'elysia'

import { routes } from './routes'

const app = new Elysia()
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return {
          code,
          message: 'Validation faield.',
          error: error.toResponse(),
        }
      }
      default: {
        set.status = 500

        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })
  .use(routes)

app.get('/health-check', () => {
  return 'API Online 🚀'
})

app.listen(3333, () => {
  console.log('Server is running on port 3333 🚀')
})
