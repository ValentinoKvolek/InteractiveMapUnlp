import { useState } from 'react'
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
  {
    id: 'IC',
    nombre: 'Ingeniería en Computación',
    descripcion: 'Carrera conjunta FI-UNLP. Circuitos, sistemas embebidos, tiempo real y computación cuántica.',
    años: 5, materias: 40,
  },
  {
    id: 'CDO',
    nombre: 'Ciencia de Datos en Organizaciones',
    descripcion: 'Carrera conjunta FCE-FI. Machine learning, big data, gestión y análisis de datos en organizaciones.',
    años: 4, materias: 28,
  },
  {
    id: 'APU',
    nombre: 'Analista Programador Universitario',
    descripcion: 'Terciario universitario orientado al desarrollo de software, estructuras de datos y proyectos de software.',
    años: 3, materias: 23,
  },
  {
    id: 'ATIC',
    nombre: 'Analista en Tecnologías de la Información y la Comunicación',
    descripcion: 'Terciario universitario con orientaciones en web, cloud, mobile y seguridad informática.',
    años: 3, materias: 24,
  },
]

export function SelectorCarrera({ onSeleccionar }) {
  const { theme: t, toggleTheme } = useTheme()
  const [hovered, setHovered] = useState(null)

  const isLight = t.name === 'light'

  const bg = isLight
    ? 'radial-gradient(ellipse 80% 60% at 50% 0%, #f5eded 0%, #fafafa 70%)'
    : 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a0c0c 0%, #0f0a0a 70%)'

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative corner marks */}
      <span style={{ position: 'absolute', top: 20, left: 20, width: 20, height: 20, borderTop: `1px solid ${t.border}`, borderLeft: `1px solid ${t.border}` }} />
      <span style={{ position: 'absolute', top: 20, right: 20, width: 20, height: 20, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}` }} />
      <span style={{ position: 'absolute', bottom: 20, left: 20, width: 20, height: 20, borderBottom: `1px solid ${t.border}`, borderLeft: `1px solid ${t.border}` }} />
      <span style={{ position: 'absolute', bottom: 20, right: 20, width: 20, height: 20, borderBottom: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}` }} />

      <div style={{ maxWidth: 680, width: '100%' }}>

        {/* Top row: logo + theme */}
        <div className="anim-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 52 }}>
          <img
            src={logo}
            alt="Facultad de Informática UNLP"
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              opacity: isLight ? 1 : 0.85,
              filter: isLight ? 'none' : 'brightness(0.9)',
            }}
          />
          <button
            onClick={toggleTheme}
            style={{
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              background: 'transparent',
              color: t.textMuted,
              border: `1px solid ${t.border}`,
              borderRadius: 4,
              padding: '6px 12px',
              cursor: 'pointer',
              letterSpacing: '0.5px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.borderColor = t.borderActive }}
            onMouseLeave={e => { e.currentTarget.style.color = t.textMuted; e.currentTarget.style.borderColor = t.border }}
          >
            {isLight ? '◐ oscuro' : '◑ claro'}
          </button>
        </div>

        {/* Heading block */}
        <div style={{ marginBottom: 44 }}>
          <p className="anim-fade-up" style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 500,
            color: t.accent,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Facultad de Informática · UNLP
          </p>

          <h1 className="anim-fade-up anim-fade-up-d1" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(38px, 6vw, 52px)',
            fontWeight: 700,
            color: t.textPrimary,
            lineHeight: 1.08,
            letterSpacing: '-0.5px',
            marginBottom: 8,
          }}>
            Mapa de correlativas
          </h1>

          <div className="anim-fade-up anim-fade-up-d1" style={{
            width: 48,
            height: 2,
            background: t.accent,
            borderRadius: 1,
            margin: '16px 0',
          }} />

          <p className="anim-fade-up anim-fade-up-d2" style={{
            fontSize: 14,
            fontWeight: 300,
            color: t.textMuted,
            letterSpacing: '0.1px',
            lineHeight: 1.6,
          }}>
            Seguí tu avance en la carrera. Plan 2021.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
          {CARRERAS.map((c, i) => {
            const isHov = hovered === c.id
            return (
              <button
                key={c.id}
                onClick={() => onSeleccionar(c.id)}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                className={`anim-fade-up anim-fade-up-d${i + 3}`}
                style={{
                  flex: '1 1 280px',
                  background: isHov ? t.cardHover : t.card,
                  border: `1px solid ${isHov ? t.borderActive : t.border}`,
                  borderLeft: `3px solid ${isHov ? t.accent : t.border}`,
                  borderRadius: 8,
                  padding: '26px 28px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease',
                  transform: isHov ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isHov
                    ? (isLight ? '0 8px 24px rgba(128,0,32,0.08)' : '0 8px 32px rgba(0,0,0,0.4)')
                    : 'none',
                }}
              >
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color: isHov ? t.accent : t.textMuted,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                  transition: 'color 0.2s',
                }}>
                  {c.id}
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: t.textPrimary,
                  margin: '0 0 10px',
                  lineHeight: 1.25,
                  letterSpacing: '-0.2px',
                }}>
                  {c.nombre}
                </h2>

                <p style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: t.textMuted,
                  lineHeight: 1.65,
                  margin: '0 0 22px',
                }}>
                  {c.descripcion}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: `1px solid ${t.border}`,
                  paddingTop: 14,
                }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: t.textDim,
                    display: 'flex',
                    gap: 10,
                  }}>
                    <span>{c.años} años</span>
                    <span style={{ color: t.border }}>·</span>
                    <span>{c.materias} materias</span>
                  </div>
                  <span style={{
                    fontSize: 13,
                    color: isHov ? t.accent : t.textMuted,
                    fontWeight: 500,
                    transition: 'color 0.2s',
                    letterSpacing: '-0.2px',
                  }}>
                    Ver mapa →
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="anim-fade-up anim-fade-up-d4" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: t.textFaint, letterSpacing: '0.1px', marginBottom: 16 }}>
            El progreso se guarda en tu navegador, por separado para cada carrera.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 300 }}>Hecho por Valentino Kvolek</span>
            <span style={{ fontSize: 11, color: t.border }}>·</span>
            <a
              href="https://github.com/ValentinoKvolek/InteractiveMapUnlp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: t.textMuted, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = t.textPrimary}
              onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <span style={{ fontSize: 11, color: t.border }}>·</span>
            <a
              href="https://www.linkedin.com/in/valenfranco/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: t.textMuted, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = t.textPrimary}
              onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
