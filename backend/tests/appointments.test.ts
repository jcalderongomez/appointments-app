// Importa supertest para simular peticiones HTTP
import request from 'supertest'

// Importa la app de Express
import app from '../src/server'

// Agrupa los tests relacionados con la API de citas
describe('API de Citas', () => {

  // Test: verificar que la API rechace una cita vacía
  it('debería rechazar una cita sin campos', async () => {
    // Hacemos un POST a /api/appointments con un body vacío
    const res = await request(app).post('/api/appointments').send({})

    // Esperamos que la API devuelva status 400 (Bad Request)
    expect(res.statusCode).toBe(400)
  })
})
