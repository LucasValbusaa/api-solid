import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for gyms', async () => {
    const { token } = await createAndAuthenticateUser(true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some Description',
        phone: '999999999',
        latitude: -3.7289984,
        longitude: -38.5024,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some Description',
        phone: '999999999',
        latitude: -3.7289984,
        longitude: -38.5024,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'Javascript' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms[0]).toEqual(
      expect.objectContaining({
        title: 'Javascript Gym',
        description: 'Some Description',
        phone: '999999999',
        latitude: '-3.7289984',
        longitude: '-38.5024',
      }),
    )
  })
})
