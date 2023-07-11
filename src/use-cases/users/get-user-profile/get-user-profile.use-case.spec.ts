import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile.use-case'
import { ResourceNotFoundError } from '../../errors/resource-not-found.error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users/in-memory-users.repository'

describe('Get User Profile Use Case Unit Tests', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toStrictEqual(createdUser.id)
    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
    expect(user.password_hash).toEqual(expect.any(String))
    expect(user.created_at).toStrictEqual(createdUser.created_at)
  })

  it('should not be able to get user profile with wrong user id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrong_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
