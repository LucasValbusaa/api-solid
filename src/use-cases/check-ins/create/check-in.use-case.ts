import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/contracts/check-ins.repository'
import { GymsRepository } from '@/repositories/contracts/gyms.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance.error'
import { MaxNumbersOfCheckInsError } from '@/use-cases/errors/max-numbers-of-check-ins.error'

type CheckInUseCaseInput = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUseCaseOutput = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseInput): Promise<CheckInUseCaseOutput> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumbersOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
