export class MaxNumbersOfCheckInsError extends Error {
  constructor() {
    super('Max numbers of check-ins reached.')
    this.name = 'Max Numbers Of Check-ins Error'
  }
}
