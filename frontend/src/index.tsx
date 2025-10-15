import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

/**
 * index.tsx - Punto de entrada de la aplicación React
 *
 * Este archivo se encarga de:
 * 1. Seleccionar el contenedor HTML donde se montará la app.
 * 2. Crear un root de React usando `createRoot` (React 18+).
 * 3. Renderizar el componente principal <App /> dentro del root.
 *
 * Nota: El operador "!" en getElementById asegura a TypeScript que el elemento existe.
 */

// Obtener el contenedor HTML donde se montará la aplicación
const container = document.getElementById('root')!

// Crear un root de React (nuevo API de React 18)
const root = createRoot(container)

// Renderizar el componente principal de la aplicación
root.render(<App />)
