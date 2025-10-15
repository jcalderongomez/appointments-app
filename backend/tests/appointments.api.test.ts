// Importa supertest, una librería para probar endpoints HTTP en Node.js
import request from 'supertest'

// Importa la conexión a la base de datos para cerrarla al final de los tests
import { pool } from '../src/db'

// Importa la instancia de Express de tu servidor
import app from '../src/server'

// Agrupa los tests relacionados con la API de appointments
describe('API /api/appointments', () => {

  // Define un test concreto
  it('debería crear una cita válida', async () => {

    // Datos de prueba de la nueva cita
    const newAppt = {
      name: 'Carlos',
      email: 'carlos@mail.com',
      date: '2025-10-20',
      time: '14:00',
      reason: 'Consulta general'
    }

    // Hace una petición POST al endpoint /api/appointments con los datos de prueba
    const res = await request(app).post('/api/appointments').send(newAppt)

    // Comprueba que el status code devuelto sea 201 (Created)
    expect(res.statusCode).toBe(201)

    // Comprueba que el nombre devuelto en la respuesta coincida con el enviado
    expect(res.body.name).toBe('Carlos')
  })
})

// Se ejecuta después de todos los tests para cerrar la conexión a la base de datos
afterAll(async () => {
  await pool.end()
})
