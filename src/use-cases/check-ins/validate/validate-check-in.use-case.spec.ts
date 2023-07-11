import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins/in-memory-check-ins.repository'
import { ValidateCheckInUseCase } from './validate-check-in.use-case'
import { ResourceNotFoundError } from '../../errors/resource-not-found.error'
import { LateCheckInValidationError } from '../../errors/late-check-in-validation.error'

describe('Validate Check-in Use Case Unit Tests', () => {
  let repository: InMemoryCheckInsRepository
  let sut: ValidateCheckInUseCase

  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(repository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await repository.create({
      gym_id: 'gym-id',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    const updatedCheckIn = await repository.findById(checkIn.id)

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(updatedCheckIn?.validated_at).toEqual(checkIn.validated_at)
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should no be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await repository.create({
      gym_id: 'gym-id',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
