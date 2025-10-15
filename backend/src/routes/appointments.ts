import express from 'express'
import { AppointmentModel } from '../models/appointment.model'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const appts = await AppointmentModel.getAll()
    res.json(appts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, email, date, time, reason } = req.body
    if (!name || !email || !date || !time || !reason) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    const newAppt = await AppointmentModel.create({ name, email, date, time, reason })
    res.status(201).json(newAppt)
  } catch (err: any) {
    console.error(err)
    // Enviar el mensaje exacto del error si existe
    res.status(400).json({ error: err.message || 'Internal server error' })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await AppointmentModel.delete(Number(req.params.id))
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
