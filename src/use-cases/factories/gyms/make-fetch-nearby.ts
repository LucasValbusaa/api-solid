import { PrismaGymsRepository } from '@/repositories/prisma/gyms/prisma-gyms.repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/gyms/fetch/nearby/fetch-nearby-gyms.use-case'

export function makeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGymUseCase
}
