import { AppointmentModel } from '../src/models/appointment.model'
import { pool } from '../src/db'

describe('Validación de duplicados', () => {
  const mockAppointment = {
    name: 'Juan Test',
    email: 'juan@example.com',
    date: '2025-10-15',
    time: '10:00',
    reason: 'Consulta general'
  }

  beforeAll(async () => {
    await pool.query('DELETE FROM appointments')
  })

  afterAll(async () => {
    await pool.query('DELETE FROM appointments')
    await pool.end()
  })

  it('debería permitir crear la primera cita', async () => {
    const created = await AppointmentModel.create(mockAppointment)
    expect(created).toHaveProperty('id')
  })

  it('debería rechazar una cita duplicada (misma fecha y hora)', async () => {
    await expect(AppointmentModel.create(mockAppointment)).rejects.toThrow(
      'Ya existe una cita en esa fecha y hora.'
    )
  })
})
