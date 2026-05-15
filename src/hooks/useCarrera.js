import { useState, useCallback } from 'react'

export const ESTADOS = {
  BLOQUEADA: 'bloqueada',
  DISPONIBLE: 'disponible',
  CURSANDO: 'cursando',
  REGULAR: 'regular',
  FINAL_PENDIENTE: 'final_pendiente', // final rendido pero no acreditado aún
  APROBADA: 'aprobada',
}

// Ciclo normal con click
const CICLO = [
  ESTADOS.DISPONIBLE,
  ESTADOS.CURSANDO,
  ESTADOS.REGULAR,
  ESTADOS.FINAL_PENDIENTE,
  ESTADOS.APROBADA,
]

function storageKey(carreraId) {
  return `unlp-progreso-${carreraId}`
}

function estadoInicial(materias, carreraId) {
  try {
    const saved = localStorage.getItem(storageKey(carreraId))
    if (saved) return JSON.parse(saved)
  } catch {}
  const initial = {}
  for (const m of materias) {
    initial[m.id] = m.correlativasCursar.length === 0 ? ESTADOS.DISPONIBLE : ESTADOS.BLOQUEADA
  }
  return initial
}

function recalcular(progreso, materias) {
  const nuevo = { ...progreso }
  for (const m of materias) {
    // Aprobada y final_pendiente no se tocan automáticamente
    if (nuevo[m.id] === ESTADOS.APROBADA || nuevo[m.id] === ESTADOS.FINAL_PENDIENTE) continue
    const cumple = m.correlativasCursar.every(
      id => nuevo[id] === ESTADOS.REGULAR
        || nuevo[id] === ESTADOS.FINAL_PENDIENTE
        || nuevo[id] === ESTADOS.APROBADA
    )
    if (nuevo[m.id] === ESTADOS.BLOQUEADA && cumple) nuevo[m.id] = ESTADOS.DISPONIBLE
    if ([ESTADOS.DISPONIBLE, ESTADOS.CURSANDO, ESTADOS.REGULAR].includes(nuevo[m.id]) && !cumple)
      nuevo[m.id] = ESTADOS.BLOQUEADA
  }
  return nuevo
}

export function useCarrera(materias, carreraId) {
  const [progreso, setProgreso] = useState(() => estadoInicial(materias, carreraId))

  const avanzarEstado = useCallback((id) => {
    setProgreso(prev => {
      const actual = prev[id]
      if (actual === ESTADOS.BLOQUEADA) return prev
      const idx = CICLO.indexOf(actual)
      const siguiente = idx === CICLO.length - 1 ? CICLO[0] : CICLO[idx + 1]
      const nuevo = recalcular({ ...prev, [id]: siguiente }, materias)
      localStorage.setItem(storageKey(carreraId), JSON.stringify(nuevo))
      return nuevo
    })
  }, [materias, carreraId])

  const resetear = useCallback(() => {
    localStorage.removeItem(storageKey(carreraId))
    setProgreso(estadoInicial(materias, carreraId))
  }, [materias, carreraId])

  const puedeRendirFinal = useCallback((id) => {
    const m = materias.find(x => x.id === id)
    if (!m) return false
    return m.correlativasFinal.every(cid => progreso[cid] === ESTADOS.APROBADA)
  }, [progreso, materias])

  // Correlativas de final que aún faltan aprobar
  const correlativasFinalFaltantes = useCallback((id) => {
    const m = materias.find(x => x.id === id)
    if (!m) return []
    return m.correlativasFinal
      .filter(cid => progreso[cid] !== ESTADOS.APROBADA)
      .map(cid => materias.find(x => x.id === cid))
      .filter(Boolean)
  }, [progreso, materias])

  const stats = {
    total: materias.filter(m => !m.esTesina).length,
    aprobadas: Object.values(progreso).filter(e => e === ESTADOS.APROBADA).length,
    pendientes: Object.values(progreso).filter(e => e === ESTADOS.FINAL_PENDIENTE).length,
    regulares: Object.values(progreso).filter(e => e === ESTADOS.REGULAR).length,
    cursando: Object.values(progreso).filter(e => e === ESTADOS.CURSANDO).length,
  }

  return { progreso, avanzarEstado, resetear, puedeRendirFinal, correlativasFinalFaltantes, stats }
}
