import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/contracts/check-ins.repository'

type FetchMemberCheckInsHistoryUseCaseInput = {
  userId: string
  page: number
}

type FetchMemberCheckInsHistoryUseCaseOutput = {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsHistoryUseCaseInput): Promise<FetchMemberCheckInsHistoryUseCaseOutput> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
