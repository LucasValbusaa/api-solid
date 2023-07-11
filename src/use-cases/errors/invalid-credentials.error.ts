export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials error.')
    this.name = 'Invalid Credentials Error'
  }
}
