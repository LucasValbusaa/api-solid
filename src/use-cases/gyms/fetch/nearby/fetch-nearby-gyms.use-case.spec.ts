import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms/in-memory-gyms.repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.use-case'

describe('Fetch Nearby Gyms Use Case Unit Tests', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: '123',
      latitude: -3.7289984,
      longitude: -38.5024,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: '123',
      latitude: 3.7289984,
      longitude: 38.5024,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.7289984,
      userLongitude: -38.5024,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
