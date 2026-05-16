import { useState, useCallback } from 'react'

export const ESTADOS = {
  BLOQUEADA:       'bloqueada',
  DISPONIBLE:      'disponible',
  CURSANDO:        'cursando',
  REGULAR:         'regular',
  FINAL_PENDIENTE: 'final_pendiente',
  APROBADA:        'aprobada',
}

function storageKey(carreraId)      { return `unlp-progreso-${carreraId}` }
function savedStatesKey(carreraId)  { return `unlp-saved-${carreraId}` }

function estadoInicial(materias, carreraId) {
  try {
    const saved = localStorage.getItem(storageKey(carreraId))
    if (saved) return JSON.parse(saved)
  } catch {}
  const initial = {}
  for (const m of materias)
    initial[m.id] = m.correlativasCursar.length === 0 ? ESTADOS.DISPONIBLE : ESTADOS.BLOQUEADA
  return initial
}

function savedStatesInicial(carreraId) {
  try {
    const saved = localStorage.getItem(savedStatesKey(carreraId))
    if (saved) return JSON.parse(saved)
  } catch {}
  return {}
}

// savedStates: mapa id → último estado que el usuario asignó explícitamente (nunca BLOQUEADA)
// Cuando recalcular desbloquea una materia, la restaura a savedStates[id] en vez de DISPONIBLE
function recalcular(progreso, materias, savedStates) {
  const nuevo = { ...progreso }
  for (const m of materias) {
    // APROBADA y FINAL_PENDIENTE nunca se tocan automáticamente
    if (nuevo[m.id] === ESTADOS.APROBADA || nuevo[m.id] === ESTADOS.FINAL_PENDIENTE) continue

    const cumple = m.correlativasCursar.every(
      id => nuevo[id] === ESTADOS.REGULAR
        || nuevo[id] === ESTADOS.FINAL_PENDIENTE
        || nuevo[id] === ESTADOS.APROBADA
    )

    if (nuevo[m.id] === ESTADOS.BLOQUEADA && cumple) {
      const saved = savedStates[m.id]
      nuevo[m.id] = (saved && saved !== ESTADOS.BLOQUEADA) ? saved : ESTADOS.DISPONIBLE
    }

    if ([ESTADOS.DISPONIBLE, ESTADOS.CURSANDO, ESTADOS.REGULAR].includes(nuevo[m.id]) && !cumple)
      nuevo[m.id] = ESTADOS.BLOQUEADA
  }
  return nuevo
}

export function useCarrera(materias, carreraId) {
  const [progreso,    setProgreso]    = useState(() => estadoInicial(materias, carreraId))
  const [savedStates, setSavedStates] = useState(() => savedStatesInicial(carreraId))

  const fijarEstado = useCallback((id, nuevoEstado) => {
    setProgreso(prev => {
      if (prev[id] === ESTADOS.BLOQUEADA) return prev

      setSavedStates(prevSaved => {
        const newSaved = { ...prevSaved, [id]: nuevoEstado }
        localStorage.setItem(savedStatesKey(carreraId), JSON.stringify(newSaved))
        return newSaved
      })

      // savedStates puede estar desactualizado aquí, así que leemos de localStorage
      let currentSaved = savedStates
      try {
        const raw = localStorage.getItem(savedStatesKey(carreraId))
        if (raw) currentSaved = { ...JSON.parse(raw), [id]: nuevoEstado }
      } catch {}

      const nuevo = recalcular({ ...prev, [id]: nuevoEstado }, materias, currentSaved)
      localStorage.setItem(storageKey(carreraId), JSON.stringify(nuevo))
      return nuevo
    })
  }, [materias, carreraId, savedStates])

  const resetear = useCallback(() => {
    localStorage.removeItem(storageKey(carreraId))
    localStorage.removeItem(savedStatesKey(carreraId))
    setSavedStates({})
    setProgreso(estadoInicial(materias, carreraId))
  }, [materias, carreraId])

  const puedeRendirFinal = useCallback((id) => {
    const m = materias.find(x => x.id === id)
    if (!m) return false
    return m.correlativasFinal.every(cid => progreso[cid] === ESTADOS.APROBADA)
  }, [progreso, materias])

  const correlativasFinalFaltantes = useCallback((id) => {
    const m = materias.find(x => x.id === id)
    if (!m) return []
    return m.correlativasFinal
      .filter(cid => progreso[cid] !== ESTADOS.APROBADA)
      .map(cid => materias.find(x => x.id === cid))
      .filter(Boolean)
  }, [progreso, materias])

  const stats = {
    total:     materias.filter(m => !m.esTesina).length,
    aprobadas: Object.values(progreso).filter(e => e === ESTADOS.APROBADA).length,
    pendientes:Object.values(progreso).filter(e => e === ESTADOS.FINAL_PENDIENTE).length,
    regulares: Object.values(progreso).filter(e => e === ESTADOS.REGULAR).length,
    cursando:  Object.values(progreso).filter(e => e === ESTADOS.CURSANDO).length,
  }

  return { progreso, fijarEstado, resetear, puedeRendirFinal, correlativasFinalFaltantes, stats }
}
