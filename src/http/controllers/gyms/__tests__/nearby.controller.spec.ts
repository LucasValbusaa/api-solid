import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some Description',
        phone: '999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some Description',
        phone: '999999999',
        latitude: -27.0610928,
        longitude: -49.5529501,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -27.2092052, longitude: -49.6401091 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms[0]).toEqual(
      expect.objectContaining({
        title: 'Javascript Gym',
        description: 'Some Description',
        phone: '999999999',
        latitude: '-27.2092052',
        longitude: '-49.6401091',
      }),
    )
  })
})
