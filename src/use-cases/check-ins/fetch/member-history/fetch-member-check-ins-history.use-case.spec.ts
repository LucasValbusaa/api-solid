import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins/in-memory-check-ins.repository'
import { FetchMemberCheckInsHistoryUseCase } from './fetch-member-check-ins-history.use-case'

describe('Fetch Member Check-ins History Use Case Unit Tests', () => {
  let repository: InMemoryCheckInsRepository
  let sut: FetchMemberCheckInsHistoryUseCase

  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    sut = new FetchMemberCheckInsHistoryUseCase(repository)
  })

  it('should be able to fetch check-ins history', async () => {
    await repository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await repository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })

    expect(checkIns.length).toBe(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
      }),
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let index = 1; index <= 22; index++) {
      await repository.create({
        gym_id: `gym-${index}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })

    expect(checkIns.length).toBe(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
      }),
    ])
  })
})
