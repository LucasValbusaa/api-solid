import { PrismaGymsRepository } from '@/repositories/prisma/gyms/prisma-gyms.repository'
import { SearchGymsUseCase } from '@/use-cases/gyms/search/search-gyms.use-case'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
