import { render, screen } from '@testing-library/react'
import App from '../App'

test('muestra el título principal', () => {
  render(<App />)
  expect(screen.getByText(/Gestor de Citas/i)).toBeInTheDocument()
})
