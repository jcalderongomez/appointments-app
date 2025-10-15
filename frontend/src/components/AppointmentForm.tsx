import { useState } from 'react'

interface Props {
  onAdd: (appt: { patient: string; date: string; time: string; reason: string }) => void
}

export default function AppointmentForm({ onAdd }: Props) {
  const [form, setForm] = useState({ patient: '', date: '', time: '', reason: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.patient || !form.date || !form.time || !form.reason) return
    onAdd(form)
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
