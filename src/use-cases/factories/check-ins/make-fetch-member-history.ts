import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins/prisma-gyms.repository'
import { FetchMemberCheckInsHistoryUseCase } from '@/use-cases/check-ins/fetch/member-history/fetch-member-check-ins-history.use-case'

export function makeFetchMemberCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchMemberCheckInsHistoryUseCase =
    new FetchMemberCheckInsHistoryUseCase(checkInsRepository)

  return fetchMemberCheckInsHistoryUseCase
}
