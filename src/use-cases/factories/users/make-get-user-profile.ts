import { PrismaUsersRepository } from '@/repositories/prisma/users/prisma-users.repository'
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile/get-user-profile.use-case'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
