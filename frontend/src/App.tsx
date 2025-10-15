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

  useEffect(() => {
    fetch('http://localhost:4000/api/appointments')
      .then(res => res.json())
      .then(setAppointments)
      .catch(() => setAppointments([]))
  }, [])

const addAppointment = async (appt: Omit<Appointment, 'id'>) => {
  const res = await fetch('http://localhost:4000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: appt.patient, // <-- aquí cambias patient a name
      email: 'dummy@email.com', // si no tenés email, podés usar un placeholder
      date: appt.date,
      time: appt.time,
      reason: appt.reason
    })
  })
  const newAppt = await res.json()
  setAppointments(prev => [...prev, newAppt])
}


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
