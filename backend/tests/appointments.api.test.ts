import request from 'supertest'
import { pool } from '../src/db'
import app from '../src/server'

describe('API /api/appointments', () => {
  it('debería crear una cita válida', async () => {
    const newAppt = {
      name: 'Carlos',
      email: 'carlos@mail.com',
      date: '2025-10-20',
      time: '14:00',
      reason: 'Consulta general'
    }

    const res = await request(app).post('/api/appointments').send(newAppt)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe('Carlos')
  })
})


afterAll(async () => {
  await pool.end()
})