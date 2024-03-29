import { PrismaUsersRepository } from '@/repositories/prisma/users/prisma-users.repository'
import { RegisterUseCase } from '@/use-cases/users/register/register.use-case'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
