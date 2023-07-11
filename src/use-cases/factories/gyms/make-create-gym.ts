import { PrismaGymsRepository } from '@/repositories/prisma/gyms/prisma-gyms.repository'
import { CreateGymUseCase } from '@/use-cases/gyms/create/create-gym.use-case'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
