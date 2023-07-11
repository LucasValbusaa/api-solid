import { UsersRepository } from '@/repositories/contracts/users.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { User } from '@prisma/client'

type GetUseProfileUseCaseInput = {
  userId: string
}

type GetUseProfileUseCaseOutput = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUseProfileUseCaseInput): Promise<GetUseProfileUseCaseOutput> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
