import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { profileController } from './profile.controller'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
