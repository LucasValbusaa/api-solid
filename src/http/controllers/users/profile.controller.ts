import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { omit } from 'lodash'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  return reply.status(200).send({ user: omit(user, ['password_hash']) })
}
