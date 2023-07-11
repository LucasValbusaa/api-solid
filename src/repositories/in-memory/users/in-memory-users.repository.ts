import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../../contracts/users.repository'
import { Prisma, User } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
  private repository: User[] = []

  async findByEmail(email: string) {
    const user = this.repository.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async findById(id: string) {
    const user = this.repository.find((user) => user.id === id)

    if (!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.repository.push(user)

    return user
  }
}
