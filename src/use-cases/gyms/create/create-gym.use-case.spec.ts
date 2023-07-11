import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym.use-case'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms/in-memory-gyms.repository'
import { Prisma } from '@prisma/client'

describe('Create Gym Use Case Unit Tests', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: 'Nova academia',
      phone: '123',
      latitude: -3.7289984,
      longitude: -38.5024,
    })
    expect(gym.id).toEqual(expect.any(String))
    expect(gym).toEqual(
      expect.objectContaining({
        title: 'Academia',
        description: 'Nova academia',
        phone: '123',
        latitude: new Prisma.Decimal(-(3.7289984).toString()),
        longitude: new Prisma.Decimal(-(38.5024).toString()),
      }),
    )
  })
})
