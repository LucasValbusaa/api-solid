import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/contracts/gyms.repository'

export type CreateGymUseCaseCaseInput = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export type CreateGymUseCaseCaseOutput = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseCaseInput): Promise<CreateGymUseCaseCaseOutput> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
