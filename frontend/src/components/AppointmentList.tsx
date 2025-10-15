import React from 'react'

interface Appointment {
  id: number
  patient: string
  date: string
  time: string
  reason: string
}

interface Props {
  appointments: Appointment[]
  onDelete: (id: number) => void
}

const AppointmentList: React.FC<Props> = ({ appointments, onDelete }) => {
  if (appointments.length === 0) {
    return <p>No hay citas registradas.</p>
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div>
      {appointments.map(a => (
        <div
          key={a.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
          }}
        >
          <p><strong>Paciente:</strong> {a.patient}</p>
          <p><strong>Fecha:</strong> {formatDate(a.date)}</p>
          <p><strong>Hora:</strong> {a.time}</p>
          <p><strong>Motivo:</strong> {a.reason}</p>
          <button onClick={() => onDelete(a.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}

export default AppointmentList
