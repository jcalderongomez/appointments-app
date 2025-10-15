import { useEffect, useState } from 'react'
import AppointmentForm from './components/AppointmentForm'
import AppointmentList from './components/AppointmentList'

interface Appointment {
  id: number
  patient: string
  date: string
  time: string
  reason: string
}

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // 🔄 Cargar citas al iniciar
  useEffect(() => {
    fetch('http://localhost:4000/api/appointments')
      .then(res => res.json())
      .then(data => {
        // Mapeamos "name" del backend → "patient" en frontend
        const mapped = data.map((item: any) => ({
          id: item.id,
          patient: item.name,
          date: item.date,
          time: item.time,
          reason: item.reason
        }))
        setAppointments(mapped)
      })
      .catch(() => setAppointments([]))
  }, [])

  // ➕ Crear nueva cita
  const addAppointment = async (appt: Omit<Appointment, 'id'>) => {
    const res = await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: appt.patient,
        email: 'dummy@email.com',
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

    // También mapeamos aquí para mantener consistencia
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

  // ❌ Eliminar cita
  const deleteAppointment = async (id: number) => {
    await fetch(`http://localhost:4000/api/appointments/${id}`, { method: 'DELETE' })
    setAppointments(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestor de Citas</h1>
      <AppointmentForm onAdd={addAppointment} />
      <AppointmentList appointments={appointments} onDelete={deleteAppointment} />
    </div>
  )
}

export default App
