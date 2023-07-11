import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins/prisma-gyms.repository'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms/prisma-gyms.repository'
import { CheckInUseCase } from '@/use-cases/check-ins/create/check-in.use-case'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
