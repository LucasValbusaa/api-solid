import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in.use-case'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms/in-memory-gyms.repository'
import { Gym } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { MaxNumbersOfCheckInsError } from '../../errors/max-numbers-of-check-ins.error'
import { MaxDistanceError } from '../../errors/max-distance.error'

describe('Check In Use Case Unit Tests', () => {
  let repository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase
  let gym: Gym

  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(repository, gymsRepository)

    gym = await gymsRepository.create({
      title: 'Academia',
      description: 'Nova academia',
      phone: '123',
      latitude: new Decimal(-3.7289984),
      longitude: new Decimal(-38.5024),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to register', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: '123',
      gymId: gym.id,
      userLatitude: -3.7289984,
      userLongitude: -38.5024,
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn).toEqual(
      expect.objectContaining({
        user_id: '123',
        gym_id: gym.id,
      }),
    )
    expect(checkIn.validated_at).toBeNull()
    expect(checkIn.created_at).toBeInstanceOf(Date)
  })

  it('should not be abel to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: -3.7289984,
      userLongitude: -38.5024,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: gym.id,
        userLatitude: -3.7289984,
        userLongitude: -38.5024,
      }),
    ).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
  })

  it('should be abel to check twice but in diferente days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: -3.7289984,
      userLongitude: -38.5024,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: -3.7289984,
      userLongitude: -38.5024,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be abel to check in on distant gym', async () => {
    const gym = await gymsRepository.create({
      title: 'Academia',
      description: 'Nova academia',
      latitude: new Decimal(-3.7289984),
      longitude: new Decimal(-38.5024),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: gym.id,
        userLatitude: 3.7289984,
        userLongitude: 38.5024,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
