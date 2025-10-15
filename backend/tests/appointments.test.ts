import request from 'supertest'
import app from '../src/server'

describe('API de Citas', () => {
  it('debería rechazar una cita sin campos', async () => {
    const res = await request(app).post('/api/appointments').send({})
    expect(res.statusCode).toBe(400)
  })
})
