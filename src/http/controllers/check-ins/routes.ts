import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createCheckInController } from './create.controller'
import { validateCheckInController } from './validate.controller'
import { checkInsHistoryController } from './history.controller'
import { checkInsMetricsController } from './metrics.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', checkInsHistoryController)
  app.get('/check-ins/metrics', checkInsMetricsController)

  app.post('/gyms/:gymId/check-ins', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
