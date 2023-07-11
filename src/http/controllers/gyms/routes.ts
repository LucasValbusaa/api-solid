import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { searchGymsController } from './search.controller'
import { nearbyGymController } from './nearby.controller'
import { createGymController } from './create.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', nearbyGymController)
  app.post('/gyms', { onRequest: [verifyUserRole] }, createGymController)
}
