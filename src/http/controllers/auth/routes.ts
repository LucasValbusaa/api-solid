import { FastifyInstance } from 'fastify'
import { authenticateController } from '../auth/authenticate.controller'
import { refreshController } from './refresh-token.controller'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshController)
}
