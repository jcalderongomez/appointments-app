import React from 'react'

/**
 * Representa una cita médica.
 *
 * @property id - Identificador único de la cita
 * @property patient - Nombre del paciente
 * @property date - Fecha de la cita en formato ISO (YYYY-MM-DD)
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
 * Props para el componente AppointmentList
 *
 * @property appointments - Lista de citas a mostrar
 * @property onDelete - Función que se ejecuta al eliminar una cita, recibe el id de la cita
 */
interface Props {
  appointments: Appointment[]
  onDelete: (id: number) => void
}

/**
 * Componente AppointmentList
 *
 * Muestra una lista de citas médicas.
 * Si no hay citas, muestra un mensaje indicando que no hay registros.
 *
 * Funcionalidad:
 * - Formatea la fecha de cada cita a formato local "es-CO"
 * - Permite eliminar una cita usando la función onDelete
 *
 * Renderiza:
 * - Un contenedor por cada cita con:
 *    - Paciente
 *    - Fecha (formateada)
 *    - Hora
 *    - Motivo
 *    - Botón "Eliminar"
 *
 * @param appointments - Lista de citas
 * @param onDelete - Función para eliminar una cita
 */
const AppointmentList: React.FC<Props> = ({ appointments, onDelete }) => {
  // Si no hay citas, mostrar mensaje
  if (appointments.length === 0) {
    return <p>No hay citas registradas.</p>
  }

  // Formatea la fecha ISO a formato local colombiano
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
