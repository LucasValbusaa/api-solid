import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins/prisma-gyms.repository'

import { GetUserMetricsUseCase } from '@/use-cases/check-ins/get-user-metrics/get-user-metrics.use-case'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
