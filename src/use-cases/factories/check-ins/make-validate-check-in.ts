import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins/prisma-gyms.repository'
import { ValidateCheckInUseCase } from '@/use-cases/check-ins/validate/validate-check-in.use-case'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
