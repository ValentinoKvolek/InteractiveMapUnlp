import { useState } from 'react'
import { useCarrera } from './hooks/useCarrera'
import { DiagramaCarrera } from './components/DiagramaCarrera'
import { SelectorCarrera } from './components/SelectorCarrera'
import { useTheme } from './context/ThemeContext'
import logo from './assets/logo.png'
import * as LI from './data/licenciaturaInformatica'
import * as LS from './data/licenciaturaSistemas'
import * as IC from './data/ingenieriaComputacion'
import * as CDO from './data/cienciaDatosOrganizaciones'
import * as APU from './data/analistaProgramador'
import * as ATIC from './data/analistaTIC'

const DATOS_CARRERA = { LI, LS, IC, CDO, APU, ATIC }
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
  const { progreso, fijarEstado, resetear, puedeRendirFinal, correlativasFinalFaltantes, stats } = useCarrera(materias, carreraInfo.id)
  const [confirmarReset, setConfirmarReset] = useState(false)

  const faltantes = stats.total - stats.aprobadas
  const porcentaje = Math.round((stats.aprobadas / stats.total) * 100)

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: t.root, fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header className="anim-fade-in" style={{ flexShrink: 0, background: t.header, borderBottom: `1px solid ${t.border}`, padding: '12px 24px 10px' }}>

        {/* Fila superior */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onCambiarCarrera} style={ghostBtn(t)}>← volver</button>
            <img
              src={logo}
              alt="Facultad de Informática UNLP"
              style={{
                width: 28, height: 28,
                borderRadius: '50%',
                opacity: t.name === 'dark' ? 0.85 : 1,
                flexShrink: 0,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {carreraInfo.id}
              </span>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 600, color: t.textPrimary, letterSpacing: '-0.2px' }}>
                {carreraInfo.nombre}
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: t.textMuted, letterSpacing: '0.5px' }}>· Plan 2021</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 10, flexWrap: 'wrap' }}>
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
            <div style={{ width: 90, height: 3, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
              <div
                className="progress-fill"
                style={{ width: `${porcentaje}%`, height: '100%', background: t.accent, borderRadius: 2 }}
              />
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: t.textSecondary, minWidth: 30 }}>
              {porcentaje}%
            </span>
          </div>
        </div>

        {/* Leyenda */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { key: 'bloqueada',        label: 'Bloqueada' },
            { key: 'disponible',       label: 'Disponible' },
            { key: 'cursando',         label: 'Cursando' },
            { key: 'regular',          label: 'Regular' },
            { key: 'final_pendiente',  label: 'Final pendiente' },
            { key: 'aprobada',         label: 'Aprobada' },
          ].map(({ key, label }) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 300, color: t.textMuted, letterSpacing: '0.2px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.estados[key].border, display: 'inline-block', flexShrink: 0 }} />
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
          color: t.textMuted,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          padding: '7px 13px',
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          cursor: 'pointer',
          letterSpacing: '0.5px',
          boxShadow: t.name === 'dark'
            ? '0 2px 12px rgba(0,0,0,0.5)'
            : '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderActive; e.currentTarget.style.color = t.textSecondary }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted }}
      >
        {t.name === 'dark' ? '◑ claro' : '◐ oscuro'}
      </button>

      {/* Badge de autor */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        background: t.header,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: '7px 14px',
        fontSize: 11,
        fontWeight: 300,
        color: t.textMuted,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: t.name === 'dark'
          ? '0 2px 12px rgba(0,0,0,0.5)'
          : '0 2px 12px rgba(0,0,0,0.08)',
      }}>
        <span style={{ color: t.textFaint }}>by Valentino Kvolek</span>
        <a
          href="https://github.com/ValentinoKvolek/InteractiveMapUnlp"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          style={{ color: t.textMuted, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.textPrimary}
          onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/valenfranco/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          style={{ color: t.textMuted, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.textPrimary}
          onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <DiagramaCarrera
          materias={materias}
          progreso={progreso}
          fijarEstado={fijarEstado}
          puedeRendirFinal={puedeRendirFinal}
          correlativasFinalFaltantes={correlativasFinalFaltantes}
        />
      </div>
    </div>
  )
}

function StatItem({ t, value, label, accent }) {
  return (
    <div style={{ textAlign: 'center', padding: '2px 16px 2px 0' }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 22,
        fontWeight: 500,
        color: accent ? t.textPrimary : t.textSecondary,
        lineHeight: 1,
        letterSpacing: '-0.5px',
      }}>
        {value}
      </div>
      <div style={{ fontSize: 9, fontWeight: 300, color: t.textMuted, marginTop: 3, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

function StatDivider({ t }) {
  return <div style={{ width: 1, height: 28, background: t.border, margin: '0 16px 0 0', flexShrink: 0 }} />
}

function ghostBtn(t) {
  return {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: 400,
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
