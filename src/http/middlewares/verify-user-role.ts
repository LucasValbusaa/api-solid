import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role } = request.user

  if (role !== 'ADMIN') {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
