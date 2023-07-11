import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins/in-memory-check-ins.repository'
import { GetUserMetricsUseCase } from './get-user-metrics.use-case'

describe('Get User Metrics Use Case Unit Tests', () => {
  let repository: InMemoryCheckInsRepository
  let sut: GetUserMetricsUseCase

  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(repository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    for (let index = 0; index < 22; index++) {
      await repository.create({
        gym_id: `gym-${index}`,
        user_id: 'user-01',
      })
    }

    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    expect(checkInsCount).toBe(22)
  })
})
