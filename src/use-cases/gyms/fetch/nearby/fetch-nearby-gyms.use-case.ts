import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/contracts/gyms.repository'

export type FetchNearbyGymsUseCaseCaseInput = {
  userLatitude: number
  userLongitude: number
}

export type FetchNearbyGymsUseCaseCaseOutput = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseCaseInput): Promise<FetchNearbyGymsUseCaseCaseOutput> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
