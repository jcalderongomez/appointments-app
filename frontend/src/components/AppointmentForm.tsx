import { useState } from 'react'

/**
 * Props para el componente AppointmentForm.
 *
 * @property onAdd - Función que se ejecuta al enviar el formulario. 
 *                   Recibe un objeto con la información de la cita:
 *                   - patient: nombre del paciente
 *                   - date: fecha de la cita (YYYY-MM-DD)
 *                   - time: hora de la cita (HH:MM)
 *                   - reason: motivo de la cita
 */
interface Props {
  onAdd: (appt: { patient: string; date: string; time: string; reason: string }) => void
}

/**
 * Componente AppointmentForm
 *
 * Formulario controlado para agendar citas médicas.
 * Gestiona internamente el estado de los campos del formulario usando useState.
 *
 * Comportamiento:
 * - Actualiza el estado de cada input al escribir (handleChange)
 * - Al enviar el formulario (handleSubmit):
 *    1. Previene el comportamiento por defecto del formulario
 *    2. Valida que todos los campos estén completos
 *    3. Llama a la función onAdd pasando los datos de la cita
 *    4. Reinicia el formulario a valores vacíos
 *
 * Renderiza:
 * - Inputs para: paciente, fecha, hora y motivo
 * - Botón para enviar el formulario
 *
 * @param onAdd - Función que se ejecuta al enviar la cita
 */
export default function AppointmentForm({ onAdd }: Props) {
  // Estado del formulario
  const [form, setForm] = useState({ patient: '', date: '', time: '', reason: '' })

  // Actualiza el estado cuando el usuario escribe en un input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Valida que todos los campos estén llenos
    if (!form.patient || !form.date || !form.time || !form.reason) return
    // Llama a la función de agregado
    onAdd(form)
    // Reinicia el formulario
    setForm({ patient: '', date: '', time: '', reason: '' })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
      <input name="patient" value={form.patient} onChange={handleChange} placeholder="Paciente" />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="time" type="time" value={form.time} onChange={handleChange} />
      <input name="reason" value={form.reason} onChange={handleChange} placeholder="Motivo" />
      <button type="submit">Agendar</button>
    </form>
  )
}
