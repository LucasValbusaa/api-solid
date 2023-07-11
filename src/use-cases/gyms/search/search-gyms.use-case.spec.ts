import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms/in-memory-gyms.repository'
import { SearchGymsUseCase } from './search-gyms.use-case'

describe('Search Gyms Use Case Unit Tests', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: '123',
      latitude: -3.7289984,
      longitude: -38.5024,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: '123',
      latitude: -3.7289984,
      longitude: -38.5024,
    })

    const { gyms } = await sut.execute({ query: 'Javascript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to paginated gyms search', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `Javascript Gym ${index}`,
        description: null,
        phone: '123',
        latitude: -3.7289984,
        longitude: -38.5024,
      })
    }

    const { gyms } = await sut.execute({ query: 'Javascript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
