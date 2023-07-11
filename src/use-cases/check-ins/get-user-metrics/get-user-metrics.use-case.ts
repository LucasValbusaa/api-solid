import { CheckInsRepository } from '@/repositories/contracts/check-ins.repository'

type GetUserMetricsUseCaseInput = {
  userId: string
}

type GetUserMetricsUseCaseOutput = {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseInput): Promise<GetUserMetricsUseCaseOutput> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
