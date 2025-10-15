import { AppointmentModel } from '../src/models/appointment.model'
import { pool } from '../src/db'

/**
 * Mock del pool de PostgreSQL usando Jest.
 * Reemplazamos la función "query" con un mock para controlar su comportamiento
 * durante las pruebas sin tocar la base de datos real.
 */
jest.mock('../src/db', () => ({
  pool: { query: jest.fn() }
}))

/**
 * Pruebas unitarias para AppointmentModel.create
 *
 * Objetivo: Verificar que la función `create`:
 * - Inserta una cita en la base de datos
 * - Devuelve la cita creada correctamente
 * - Llama a pool.query las veces esperadas
 */
describe('AppointmentModel.create', () => {
  it('debería insertar una cita y devolverla', async () => {
    // 1️⃣ Simular que no hay duplicados en la base de datos
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] })

    // 2️⃣ Simular la inserción exitosa de la cita
    ;(pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        { 
          id: 1, 
          name: 'Juan', 
          email: 'juan@test.com', 
          date: '2025-10-15', 
          time: '10:00', 
          reason: 'Control' 
        }
      ]
    })

    // 3️⃣ Ejecutar la función create
    const result = await AppointmentModel.create({
      name: 'Juan',
      email: 'juan@test.com',
      date: '2025-10-15',
      time: '10:00',
      reason: 'Control'
    })

    // 4️⃣ Comprobaciones / assertions
    expect(result.name).toBe('Juan') // Revisar que el nombre devuelto sea el esperado
    expect(pool.query).toHaveBeenCalledTimes(2) // Revisar que se llamara a query dos veces
  })
})
