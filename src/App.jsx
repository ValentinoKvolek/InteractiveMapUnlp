import { useState } from 'react'
import { useCarrera } from './hooks/useCarrera'
import { DiagramaCarrera } from './components/DiagramaCarrera'
import { SelectorCarrera } from './components/SelectorCarrera'
import { useTheme } from './context/ThemeContext'
import logo from './assets/logo.png'
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

  if (!carreraId) return <SelectorCarrera onSeleccionar={seleccionar} />

  const { MATERIAS, CARRERA_INFO } = DATOS_CARRERA[carreraId]
  return (
    <MapaCarrera
      materias={MATERIAS}
      carreraInfo={CARRERA_INFO}
      onCambiarCarrera={() => setCarreraId(null)}
    />
  )
}

function MapaCarrera({ materias, carreraInfo, onCambiarCarrera }) {
  const { theme: t, toggleTheme } = useTheme()
  const { progreso, avanzarEstado, resetear, puedeRendirFinal, correlativasFinalFaltantes, stats } = useCarrera(materias, carreraInfo.id)
  const [confirmarReset, setConfirmarReset] = useState(false)

  const faltantes = stats.total - stats.aprobadas
  const porcentaje = Math.round((stats.aprobadas / stats.total) * 100)

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: t.root, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <header style={{ flexShrink: 0, background: t.header, borderBottom: `1px solid ${t.border}`, padding: '14px 24px 12px' }}>

        {/* Fila superior */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={onCambiarCarrera} style={ghostBtn(t)}>← volver</button>
            <img
              src={logo}
              alt="Facultad de Informática UNLP"
              style={{
                width: 34, height: 34,
                borderRadius: '50%',
                opacity: t.name === 'dark' ? 0.85 : 1,
                flexShrink: 0,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: t.accent, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {carreraInfo.id}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, letterSpacing: '-0.3px' }}>
                {carreraInfo.nombre}
              </span>
              <span style={{ fontSize: 11, color: t.textMuted }}>· Plan 2021</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {confirmarReset ? (
              <>
                <button
                  onClick={() => { resetear(); setConfirmarReset(false) }}
                  style={{ ...ghostBtn(t), color: t.accentText, borderColor: t.accent }}
                >
                  Confirmar reset
                </button>
                <button onClick={() => setConfirmarReset(false)} style={ghostBtn(t)}>Cancelar</button>
              </>
            ) : (
              <button onClick={() => setConfirmarReset(true)} style={ghostBtn(t)}>Resetear</button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 14, flexWrap: 'wrap', background: t.card === '#FFFFFF' ? t.root : t.root, borderRadius: 8, overflow: 'hidden' }}>
          <StatItem t={t} value={faltantes}       label="faltantes"       accent />
          <StatDivider t={t} />
          <StatItem t={t} value={stats.aprobadas} label="aprobadas" />
          <StatDivider t={t} />
          <StatItem t={t} value={stats.regulares} label="regularizadas" />
          <StatDivider t={t} />
          <StatItem t={t} value={stats.pendientes} label="final pendiente" />
          <StatDivider t={t} />
          <StatItem t={t} value={stats.cursando}  label="cursando" />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 16 }}>
            <div style={{ width: 100, height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${porcentaje}%`, height: '100%', background: t.accent, borderRadius: 2, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: 12, color: t.textSecondary, fontVariantNumeric: 'tabular-nums', minWidth: 30 }}>
              {porcentaje}%
            </span>
          </div>
        </div>

        {/* Leyenda */}
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {[
            { key: 'bloqueada',        label: 'Bloqueada' },
            { key: 'disponible',       label: 'Disponible' },
            { key: 'cursando',         label: 'Cursando' },
            { key: 'regular',          label: 'Regular' },
            { key: 'final_pendiente',  label: 'Final pendiente' },
            { key: 'aprobada',         label: 'Aprobada' },
          ].map(({ key, label }) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: t.textMuted }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.estados[key].border, display: 'inline-block', flexShrink: 0 }} />
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* Botón flotante de tema */}
      <button
        onClick={toggleTheme}
        title={t.name === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 100,
          background: t.header,
          color: t.textSecondary,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          padding: '8px 14px',
          fontSize: 11,
          cursor: 'pointer',
          letterSpacing: '0.1px',
          boxShadow: t.name === 'dark'
            ? '0 2px 12px rgba(0,0,0,0.5)'
            : '0 2px 12px rgba(0,0,0,0.1)',
          transition: 'border-color 0.15s, color 0.15s',
        }}
      >
        {t.name === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      </button>

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

function StatItem({ t, value, label, accent }) {
  return (
    <div style={{ textAlign: 'center', padding: '4px 16px 4px 0' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: accent ? t.textPrimary : t.textSecondary, lineHeight: 1, letterSpacing: '-1px' }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: t.textMuted, marginTop: 3, letterSpacing: '0.2px' }}>
        {label}
      </div>
    </div>
  )
}

function StatDivider({ t }) {
  return <div style={{ width: 1, height: 32, background: t.border, margin: '0 16px 0 0', flexShrink: 0 }} />
}

function ghostBtn(t) {
  return {
    fontSize: 11,
    background: 'transparent',
    color: t.textMuted,
    border: `1px solid ${t.border}`,
    borderRadius: 5,
    padding: '5px 11px',
    cursor: 'pointer',
    letterSpacing: '0.1px',
    transition: 'color 0.15s, border-color 0.15s',
  }
}
