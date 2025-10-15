import { AppointmentModel } from '../src/models/appointment.model'
import { pool } from '../src/db'

jest.mock('../src/db', () => ({
  pool: { query: jest.fn() }
}))

describe('AppointmentModel.create', () => {
  it('debería insertar una cita y devolverla', async () => {
    // 1. Simular primera consulta: sin duplicados
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] })

    // 2. Simular segunda consulta: inserción exitosa
    ;(pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Juan', email: 'juan@test.com', date: '2025-10-15', time: '10:00', reason: 'Control' }]
    })

    const result = await AppointmentModel.create({
      name: 'Juan',
      email: 'juan@test.com',
      date: '2025-10-15',
      time: '10:00',
      reason: 'Control'
    })

    expect(result.name).toBe('Juan')
    expect(pool.query).toHaveBeenCalledTimes(2)
  })
})
