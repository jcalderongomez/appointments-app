import { pool } from '../db'
import { Appointment } from '../types'

export const AppointmentModel = {
  async getAll(): Promise<Appointment[]> {
    const result = await pool.query('SELECT * FROM appointments ORDER BY date, time')
    return result.rows
  },

  async create(appointment: Appointment): Promise<Appointment> {
    // Validar duplicado
    const { date, time } = appointment
    const duplicateCheck = await pool.query(
      'SELECT * FROM appointments WHERE date = $1 AND time = $2',
      [date, time]
    )

    if (duplicateCheck.rows.length > 0) {
      throw new Error('Ya existe una cita en esa fecha y hora.')
    }

    const result = await pool.query(
      'INSERT INTO appointments (name, email, date, time, reason) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [appointment.name, appointment.email, appointment.date, appointment.time, appointment.reason]
    )
    return result.rows[0]
  },

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM appointments WHERE id = $1', [id])
  }
}
