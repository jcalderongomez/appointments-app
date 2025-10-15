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

export default function AppointmentList({ appointments, onDelete }: Props) {
  if (appointments.length === 0) return <p>No hay citas</p>

  return (
    <ul>
      {appointments.map(a => (
        <li key={a.id}>
          <strong>{a.patient}</strong> — {a.date} {a.time} ({a.reason})
          <button onClick={() => onDelete(a.id)}>Cancelar</button>
        </li>
      ))}
    </ul>
  )
}
