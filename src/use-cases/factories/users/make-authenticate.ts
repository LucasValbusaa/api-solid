import { PrismaUsersRepository } from '@/repositories/prisma/users/prisma-users.repository'
import { AuthenticateUseCase } from '../../users/authenticate/authenticate.use-case'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
