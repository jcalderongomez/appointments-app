// Importamos el modelo de citas y la conexión a la base de datos
import { AppointmentModel } from '../src/models/appointment.model'
import { pool } from '../src/db'

// Agrupamos tests relacionados con la validación de duplicados
describe('Validación de duplicados', () => {
  // Objeto de ejemplo que usaremos en los tests
  const mockAppointment = {
    name: 'Juan Test',
    email: 'juan@example.com',
    date: '2025-10-15',
    time: '10:00',
    reason: 'Consulta general'
  }

  // Antes de todos los tests, limpiamos la tabla de citas
  beforeAll(async () => {
    await pool.query('DELETE FROM appointments')
  })

  // Después de todos los tests, limpiamos la tabla y cerramos la conexión
  afterAll(async () => {
    await pool.query('DELETE FROM appointments')
    await pool.end()
  })

  // Test 1: Crear la primera cita correctamente
  it('debería permitir crear la primera cita', async () => {
    const created = await AppointmentModel.create(mockAppointment)
    // Verificamos que se haya creado un registro con un 'id'
    expect(created).toHaveProperty('id')
  })

  // Test 2: Evitar duplicados en la misma fecha y hora
  it('debería rechazar una cita duplicada (misma fecha y hora)', async () => {
    // Esperamos que crear otra cita con la misma fecha y hora lance un error
    await expect(AppointmentModel.create(mockAppointment)).rejects.toThrow(
      'Ya existe una cita en esa fecha y hora.'
    )
  })
})
