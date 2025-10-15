import { useEffect, useState } from 'react'
import AppointmentForm from './components/AppointmentForm'
import AppointmentList from './components/AppointmentList'

/**
 * Representa una cita médica.
 *
 * @property id - Identificador único de la cita
 * @property patient - Nombre del paciente
 * @property date - Fecha de la cita (YYYY-MM-DD)
 * @property time - Hora de la cita (HH:MM)
 * @property reason - Motivo de la cita
 */
interface Appointment {
  id: number
  patient: string
  date: string
  time: string
  reason: string
}

/**
 * Componente principal de la aplicación de gestión de citas.
 *
 * Funcionalidades:
 * - Cargar citas desde el backend al iniciar la app
 * - Crear nuevas citas mediante el formulario
 * - Eliminar citas existentes
 *
 * Flujo de datos:
 * - `AppointmentForm` envía nuevas citas al backend y actualiza el estado
 * - `AppointmentList` muestra las citas y permite eliminarlas
 */
function App() {
  // Estado que guarda todas las citas
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // 🔄 Cargar citas desde el backend al iniciar la aplicación
  useEffect(() => {
    fetch('http://localhost:4000/api/appointments')
      .then(res => res.json())
      .then(data => {
        // Mapeamos los campos del backend al frontend
        const mapped = data.map((item: any) => ({
          id: item.id,
          patient: item.name, // backend devuelve "name"
          date: item.date,
          time: item.time,
          reason: item.reason
        }))
        setAppointments(mapped)
      })
      .catch(() => setAppointments([])) // fallback en caso de error
  }, [])

  /**
   * ➕ Crear nueva cita
   * @param appt Objeto con los datos de la cita (sin id)
   */
  const addAppointment = async (appt: Omit<Appointment, 'id'>) => {
    const res = await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: appt.patient, // backend espera "name"
        email: 'dummy@email.com', // valor dummy
        date: appt.date,
        time: appt.time,
        reason: appt.reason
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || 'Error al crear la cita')
      return
    }

    // Actualizar el estado con la nueva cita (mapeando backend → frontend)
    setAppointments(prev => [
      ...prev,
      {
        id: data.id,
        patient: data.name,
        date: data.date,
        time: data.time,
        reason: data.reason
      }
    ])
  }

  /**
   * ❌ Eliminar cita
   * @param id Identificador de la cita a eliminar
   */
  const deleteAppointment = async (id: number) => {
    await fetch(`http://localhost:4000/api/appointments/${id}`, { method: 'DELETE' })
    setAppointments(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestor de Citas</h1>
      {/* Formulario para agregar nuevas citas */}
      <AppointmentForm onAdd={addAppointment} />
      {/* Lista de citas con opción de eliminar */}
      <AppointmentList appointments={appointments} onDelete={deleteAppointment} />
    </div>
  )
}

export default App
