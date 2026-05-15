import { useTheme } from '../context/ThemeContext'
import logo from '../assets/logo.png'

const CARRERAS = [
  {
    id: 'LI',
    nombre: 'Licenciatura en Informática',
    descripcion: 'Teoría de la computación, IA, sistemas paralelos, verificación de programas.',
    años: 5, materias: 37,
  },
  {
    id: 'LS',
    nombre: 'Licenciatura en Sistemas',
    descripcion: 'Ingeniería de software, bases de datos, sistemas distribuidos, organizaciones.',
    años: 5, materias: 37,
  },
]

export function SelectorCarrera({ onSeleccionar }) {
  const { theme: t, toggleTheme } = useTheme()

  return (
    <div style={{ minHeight: '100vh', background: t.root, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 660, width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          {/* Fila top: logo + toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <img
              src={logo}
              alt="Facultad de Informática UNLP"
              style={{
                width: 72, height: 72,
                borderRadius: '50%',
                opacity: t.name === 'dark' ? 0.9 : 1,
                transition: 'opacity 0.2s',
              }}
            />
            <button
              onClick={toggleTheme}
              style={{ fontSize: 11, background: 'transparent', color: t.textMuted, border: `1px solid ${t.border}`, borderRadius: 5, padding: '6px 11px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              {t.name === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </button>
          </div>
          {/* Títulos */}
          <p style={{ fontSize: 11, color: t.textDim, margin: '0 0 10px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Facultad de Informática · UNLP
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: t.textPrimary, margin: '0 0 8px', letterSpacing: '-0.8px', lineHeight: 1.1 }}>
            Mapa de correlativas
          </h1>
          <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>
            Seguí tu avance en la carrera. Plan 2021.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {CARRERAS.map(c => (
            <button
              key={c.id}
              onClick={() => onSeleccionar(c.id)}
              style={{ flex: '1 1 280px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: '24px 26px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s ease, background 0.15s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderActive; e.currentTarget.style.background = t.cardHover }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.card }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: t.accent, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>
                {c.id}
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: t.textPrimary, margin: '0 0 10px', lineHeight: 1.3 }}>
                {c.nombre}
              </h2>
              <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, margin: '0 0 20px' }}>
                {c.descripcion}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${t.border}`, paddingTop: 14 }}>
                <div style={{ fontSize: 11, color: t.textDim, display: 'flex', gap: 8 }}>
                  <span>{c.años} años</span>
                  <span style={{ color: t.border }}>·</span>
                  <span>{c.materias} materias</span>
                </div>
                <span style={{ fontSize: 12, color: t.textSecondary, fontWeight: 500 }}>Ver mapa →</span>
              </div>
            </button>
          ))}
        </div>

        <p style={{ fontSize: 11, color: t.textFaint, marginTop: 36, textAlign: 'center', letterSpacing: '0.1px' }}>
          El progreso se guarda en tu navegador, por separado para cada carrera.
        </p>
      </div>
    </div>
  )
}
