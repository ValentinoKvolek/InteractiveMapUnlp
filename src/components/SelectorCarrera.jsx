const CARRERAS = [
  {
    id: 'LI',
    nombre: 'Licenciatura en Informática',
    abrev: 'LI',
    color: '#6366f1',
    border: '#818cf8',
    glow: 'rgba(99,102,241,0.3)',
    descripcion: 'Orientada a teoría de la computación, IA, sistemas paralelos y verificación de programas.',
    años: 5,
    materias: 37,
    icon: '🖥️',
  },
  {
    id: 'LS',
    nombre: 'Licenciatura en Sistemas',
    abrev: 'LS',
    color: '#10b981',
    border: '#34d399',
    glow: 'rgba(16,185,129,0.3)',
    descripcion: 'Orientada a ingeniería de software, bases de datos, sistemas distribuidos y organizaciones.',
    años: 5,
    materias: 37,
    icon: '⚙️',
  },
]

export function SelectorCarrera({ onSeleccionar }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1628',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Logo / título */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', margin: 0, letterSpacing: '-0.5px' }}>
          UNLP · Facultad de Informática
        </h1>
        <p style={{ color: '#64748b', marginTop: 8, fontSize: 15 }}>
          Mapa de correlativas · Plan 2021
        </p>
        <p style={{ color: '#475569', marginTop: 4, fontSize: 13 }}>
          Elegí tu carrera para empezar
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 720,
        width: '100%',
      }}>
        {CARRERAS.map(c => (
          <button
            key={c.id}
            onClick={() => onSeleccionar(c.id)}
            style={{
              background: '#0f172a',
              border: `2px solid ${c.border}30`,
              borderRadius: 16,
              padding: '28px 32px',
              cursor: 'pointer',
              textAlign: 'left',
              flex: '1 1 280px',
              maxWidth: 320,
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = `2px solid ${c.border}`
              e.currentTarget.style.boxShadow = `0 0 32px ${c.glow}, 0 8px 32px rgba(0,0,0,0.4)`
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = `2px solid ${c.border}30`
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Glow de fondo */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 120, height: 120,
              borderRadius: '50%',
              background: c.glow,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>

              <div style={{
                display: 'inline-block',
                background: c.color + '20',
                color: c.color,
                border: `1px solid ${c.color}40`,
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                marginBottom: 8,
                letterSpacing: '0.5px',
              }}>
                {c.abrev}
              </div>

              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', margin: '0 0 10px', lineHeight: 1.3 }}>
                {c.nombre}
              </h2>

              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, margin: '0 0 16px' }}>
                {c.descripcion}
              </p>

              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>📅 {c.años} años</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>📚 {c.materias} materias</span>
              </div>

              <div style={{
                marginTop: 20,
                background: c.color,
                color: '#fff',
                borderRadius: 8,
                padding: '8px 0',
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 600,
              }}>
                Ver mapa →
              </div>
            </div>
          </button>
        ))}
      </div>

      <p style={{ color: '#1e3a5f', fontSize: 12, marginTop: 40 }}>
        Tu progreso se guarda por separado para cada carrera
      </p>
    </div>
  )
}
