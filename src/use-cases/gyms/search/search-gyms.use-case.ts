import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/contracts/gyms.repository'

export type SearchGymsUseCaseCaseInput = {
  query: string
  page: number
}

export type SearchGymsUseCaseCaseOutput = {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseCaseInput): Promise<SearchGymsUseCaseCaseOutput> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
