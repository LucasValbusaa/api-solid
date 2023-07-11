import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })

  const { sub, role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sub,
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sub,
      expiresIn: '7d',
    },
  )

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ token })
}
