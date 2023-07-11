import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../errors/invalid-credentials.error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users/in-memory-users.repository'

describe('Authenticate Use Case Unit Tests', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
    expect(user.password_hash).toEqual(expect.any(String))
    expect(user.created_at).toBeInstanceOf(Date)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '12345 ',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
