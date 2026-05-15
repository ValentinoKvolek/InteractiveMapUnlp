import { useState } from 'react'
import { useCarrera, ESTADOS } from './hooks/useCarrera'
import { DiagramaCarrera } from './components/DiagramaCarrera'
import { SelectorCarrera } from './components/SelectorCarrera'
import * as LI from './data/licenciaturaInformatica'
import * as LS from './data/licenciaturaSistemas'

const DATOS_CARRERA = { LI, LS }
const STORAGE_CARRERA = 'unlp-carrera-seleccionada'

export default function App() {
  const [carreraId, setCarreraId] = useState(() => localStorage.getItem(STORAGE_CARRERA) || null)

  function seleccionar(id) {
    localStorage.setItem(STORAGE_CARRERA, id)
    setCarreraId(id)
  }

  function cambiarCarrera() {
    setCarreraId(null)
  }

  if (!carreraId) {
    return <SelectorCarrera onSeleccionar={seleccionar} />
  }

  const { MATERIAS, SEMESTRES_INFO, CARRERA_INFO } = DATOS_CARRERA[carreraId]
  return (
    <MapaCarrera
      materias={MATERIAS}
      semestresInfo={SEMESTRES_INFO}
      carreraInfo={CARRERA_INFO}
      onCambiarCarrera={cambiarCarrera}
    />
  )
}

function MapaCarrera({ materias, semestresInfo, carreraInfo, onCambiarCarrera }) {
  const { progreso, avanzarEstado, resetear, puedeRendirFinal, correlativasFinalFaltantes, stats } = useCarrera(materias, carreraInfo.id)
  const [confirmarReset, setConfirmarReset] = useState(false)

  const porcentaje = Math.round((stats.aprobadas / stats.total) * 100)

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{
        flexShrink: 0,
        background: 'rgba(15,23,42,0.97)',
        borderBottom: '1px solid #1e293b',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        zIndex: 10,
      }}>
        {/* Título + cambiar carrera */}
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: carreraInfo.color + '25',
                color: carreraInfo.color,
                border: `1px solid ${carreraInfo.color}50`,
                borderRadius: 5,
                fontSize: 10,
                fontWeight: 700,
                padding: '1px 6px',
                letterSpacing: '0.5px',
              }}>
                {carreraInfo.id}
              </span>
              {carreraInfo.nombre}
            </div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>
              Plan 2021 · Click en una materia para avanzar su estado
            </div>
          </div>
          <button
            onClick={onCambiarCarrera}
            style={{ fontSize: 11, background: 'transparent', color: '#475569', border: '1px solid #1e293b', borderRadius: 5, padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            ← carreras
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <StatBadge color="#22c55e" bg="#052e16" label="Aprobadas" value={stats.aprobadas} />
          <StatBadge color="#a855f7" bg="#2e1065" label="Final pend." value={stats.pendientes} />
          <StatBadge color="#f97316" bg="#431407" label="Regulares" value={stats.regulares} />
          <StatBadge color="#f59e0b" bg="#422006" label="Cursando" value={stats.cursando} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1e293b', borderRadius: 8, padding: '5px 12px' }}>
            <div style={{ width: 72, height: 5, background: '#334155', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${porcentaje}%`, height: '100%', background: carreraInfo.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#94a3b8' }}>{porcentaje}%</span>
          </div>

          {confirmarReset ? (
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => { resetear(); setConfirmarReset(false) }}
                style={{ ...btnStyle, background: '#7f1d1d', color: '#fca5a5', border: 'none' }}>
                Confirmar
              </button>
              <button onClick={() => setConfirmarReset(false)} style={btnStyle}>Cancelar</button>
            </div>
          ) : (
            <button onClick={() => setConfirmarReset(true)} style={btnStyle}>Resetear</button>
          )}
        </div>

        {/* Leyenda */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', width: '100%', paddingTop: 8, borderTop: '1px solid #1e293b' }}>
          {[
            { icon: '🔒', label: 'Bloqueada', color: '#475569' },
            { icon: '📋', label: 'Disponible', color: '#3b82f6' },
            { icon: '📖', label: 'Cursando', color: '#f59e0b' },
            { icon: '📝', label: 'Regular', color: '#f97316' },
            { icon: '⏳', label: 'Final pendiente · rendido pero no acreditado', color: '#a855f7' },
            { icon: '✅', label: 'Aprobada', color: '#22c55e' },
          ].map(({ icon, label, color }) => (
            <span key={label} style={{ fontSize: 11, color, display: 'flex', alignItems: 'center', gap: 4 }}>
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      {/* Diagrama */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <DiagramaCarrera
          materias={materias}
          progreso={progreso}
          avanzarEstado={avanzarEstado}
          puedeRendirFinal={puedeRendirFinal}
          correlativasFinalFaltantes={correlativasFinalFaltantes}
        />
      </div>
    </div>
  )
}

function StatBadge({ color, bg, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: bg, border: `1px solid ${color}30`, borderRadius: 8, padding: '4px 10px' }}>
      <span style={{ fontWeight: 700, fontSize: 15, color, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 11, color: color + 'cc' }}>{label}</span>
    </div>
  )
}

const btnStyle = {
  fontSize: 11,
  background: '#1e293b',
  color: '#94a3b8',
  border: '1px solid #334155',
  borderRadius: 6,
  padding: '4px 10px',
  cursor: 'pointer',
}
