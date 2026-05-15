import { useState, useCallback } from 'react'
import { MATERIAS, ESTADOS } from '../data/materias'

const STORAGE_KEY = 'unlp-li-progreso'

function estadoInicial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  const initial = {}
  for (const m of MATERIAS) {
    initial[m.id] = m.correlativasCursar.length === 0
      ? ESTADOS.DISPONIBLE
      : ESTADOS.BLOQUEADA
  }
  return initial
}

function calcularEstados(progreso) {
  const nuevo = { ...progreso }
  for (const m of MATERIAS) {
    if (nuevo[m.id] === ESTADOS.APROBADA) continue
    const puedesCursar = m.correlativasCursar.every(
      id => nuevo[id] === ESTADOS.REGULAR || nuevo[id] === ESTADOS.APROBADA
    )
    if (nuevo[m.id] === ESTADOS.BLOQUEADA && puedesCursar) {
      nuevo[m.id] = ESTADOS.DISPONIBLE
    }
    if ((nuevo[m.id] === ESTADOS.DISPONIBLE || nuevo[m.id] === ESTADOS.CURSANDO || nuevo[m.id] === ESTADOS.REGULAR) && !puedesCursar) {
      nuevo[m.id] = ESTADOS.BLOQUEADA
    }
  }
  return nuevo
}

const CICLO_ESTADOS = [
  ESTADOS.DISPONIBLE,
  ESTADOS.CURSANDO,
  ESTADOS.REGULAR,
  ESTADOS.APROBADA,
]

export function useCarrera() {
  const [progreso, setProgreso] = useState(estadoInicial)

  const avanzarEstado = useCallback((id) => {
    setProgreso(prev => {
      const estadoActual = prev[id]
      if (estadoActual === ESTADOS.BLOQUEADA) return prev

      const idx = CICLO_ESTADOS.indexOf(estadoActual)
      const siguiente = idx === CICLO_ESTADOS.length - 1
        ? CICLO_ESTADOS[0]
        : CICLO_ESTADOS[idx + 1]

      const nuevo = { ...prev, [id]: siguiente }
      const recalculado = calcularEstados(nuevo)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recalculado))
      return recalculado
    })
  }, [])

  const resetear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgreso(estadoInicial())
  }, [])

  const puedeRendirFinal = useCallback((id) => {
    const materia = MATERIAS.find(m => m.id === id)
    if (!materia) return false
    return materia.correlativasFinal.every(
      cid => progreso[cid] === ESTADOS.APROBADA
    )
  }, [progreso])

  const stats = {
    total: MATERIAS.filter(m => !m.esTesina).length,
    aprobadas: Object.values(progreso).filter(e => e === ESTADOS.APROBADA).length,
    regulares: Object.values(progreso).filter(e => e === ESTADOS.REGULAR).length,
    cursando: Object.values(progreso).filter(e => e === ESTADOS.CURSANDO).length,
  }

  return { progreso, avanzarEstado, resetear, puedeRendirFinal, stats }
}
