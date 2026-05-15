import { useState } from 'react'
import { ESTADOS } from './data/materias'
import { useCarrera } from './hooks/useCarrera'
import { DiagramaCarrera } from './components/DiagramaCarrera'

export default function App() {
  const { progreso, avanzarEstado, resetear, puedeRendirFinal, stats } = useCarrera()
  const [confirmarReset, setConfirmarReset] = useState(false)

  const porcentaje = Math.round((stats.aprobadas / stats.total) * 100)

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{
        flexShrink: 0,
        background: 'rgba(15,23,42,0.95)',
        borderBottom: '1px solid #1e293b',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        {/* Título */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
            Licenciatura en Informática · UNLP
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>
            Plan 2021 · Click en una materia para avanzar su estado
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <StatBadge color="#22c55e" bg="#052e16" label="Aprobadas" value={stats.aprobadas} />
          <StatBadge color="#f97316" bg="#431407" label="Regulares" value={stats.regulares} />
          <StatBadge color="#f59e0b" bg="#422006" label="Cursando" value={stats.cursando} />

          {/* Barra de progreso */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1e293b', borderRadius: 8, padding: '6px 12px' }}>
            <div style={{ width: 80, height: 6, background: '#334155', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${porcentaje}%`, height: '100%', background: '#22c55e', borderRadius: 3, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#94a3b8' }}>{porcentaje}%</span>
          </div>

          {/* Reset */}
          {confirmarReset ? (
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => { resetear(); setConfirmarReset(false) }}
                style={{ ...btnStyle, background: '#7f1d1d', color: '#fca5a5' }}>
                Confirmar
              </button>
              <button onClick={() => setConfirmarReset(false)}
                style={{ ...btnStyle }}>
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmarReset(true)} style={btnStyle}>
              Resetear
            </button>
          )}
        </div>

        {/* Leyenda */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%', marginTop: 4, paddingTop: 8, borderTop: '1px solid #1e293b' }}>
          {[
            { icon: '🔒', label: 'Bloqueada', color: '#64748b' },
            { icon: '📋', label: 'Disponible', color: '#3b82f6' },
            { icon: '📖', label: 'Cursando', color: '#f59e0b' },
            { icon: '📝', label: 'Regular · aprobaste cursada', color: '#f97316' },
            { icon: '✅', label: 'Aprobada · final rendido', color: '#22c55e' },
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
          progreso={progreso}
          avanzarEstado={avanzarEstado}
          puedeRendirFinal={puedeRendirFinal}
        />
      </div>
    </div>
  )
}

function StatBadge({ color, bg, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: bg, border: `1px solid ${color}30`, borderRadius: 8, padding: '5px 10px' }}>
      <span style={{ fontWeight: 700, fontSize: 16, color, lineHeight: 1 }}>{value}</span>
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
  padding: '5px 10px',
  cursor: 'pointer',
}
