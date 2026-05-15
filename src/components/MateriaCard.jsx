import { ESTADOS, MATERIAS } from '../data/materias'

const CONFIG_ESTADO = {
  [ESTADOS.BLOQUEADA]: {
    bg: 'bg-slate-800/60',
    border: 'border-slate-700/50',
    text: 'text-slate-500',
    badge: 'bg-slate-700 text-slate-400',
    label: 'Bloqueada',
    icon: '🔒',
    cursor: 'cursor-not-allowed',
  },
  [ESTADOS.DISPONIBLE]: {
    bg: 'bg-slate-700/80 hover:bg-slate-600/80',
    border: 'border-slate-500 hover:border-blue-400',
    text: 'text-slate-200',
    badge: 'bg-blue-900/60 text-blue-300',
    label: 'Disponible',
    icon: '📋',
    cursor: 'cursor-pointer',
  },
  [ESTADOS.CURSANDO]: {
    bg: 'bg-yellow-900/40 hover:bg-yellow-800/50',
    border: 'border-yellow-500/70 hover:border-yellow-400',
    text: 'text-yellow-100',
    badge: 'bg-yellow-800/60 text-yellow-300',
    label: 'Cursando',
    icon: '📖',
    cursor: 'cursor-pointer',
  },
  [ESTADOS.REGULAR]: {
    bg: 'bg-orange-900/40 hover:bg-orange-800/50',
    border: 'border-orange-500/70 hover:border-orange-400',
    text: 'text-orange-100',
    badge: 'bg-orange-800/60 text-orange-300',
    label: 'Regular',
    icon: '📝',
    cursor: 'cursor-pointer',
  },
  [ESTADOS.APROBADA]: {
    bg: 'bg-green-900/40 hover:bg-green-800/50',
    border: 'border-green-500/70 hover:border-green-400',
    text: 'text-green-100',
    badge: 'bg-green-800/60 text-green-300',
    label: 'Aprobada',
    icon: '✅',
    cursor: 'cursor-pointer',
  },
}

export function MateriaCard({ materia, estado, onAvanzar, puedeRendirFinal }) {
  const cfg = CONFIG_ESTADO[estado]
  const bloqueada = estado === ESTADOS.BLOQUEADA

  const correlativasFaltantes = bloqueada
    ? materia.correlativasCursar.filter(id => {
        const m = MATERIAS.find(x => x.id === id)
        return m ? m.nombre : id
      })
    : []

  return (
    <div
      onClick={bloqueada ? undefined : onAvanzar}
      title={bloqueada ? 'Faltan correlativas para cursar' : `Click para avanzar → ${getProximoEstado(estado)}`}
      className={`
        relative rounded-lg border p-3 transition-all duration-200 select-none
        ${cfg.bg} ${cfg.border} ${cfg.cursor}
        ${bloqueada ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-xs font-mono text-slate-500">{materia.id}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${cfg.badge} shrink-0`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>

      <p className={`text-sm font-medium leading-snug ${cfg.text}`}>
        {materia.nombre}
      </p>

      {materia.esOptativa && (
        <p className="text-xs text-slate-500 mt-1">Materia optativa</p>
      )}
      {materia.esTesina && (
        <p className="text-xs text-slate-500 mt-1">{materia.nota}</p>
      )}

      {estado === ESTADOS.REGULAR && (
        <div className={`mt-2 text-xs px-2 py-1 rounded ${puedeRendirFinal ? 'bg-green-900/50 text-green-300' : 'bg-red-900/40 text-red-400'}`}>
          {puedeRendirFinal ? '✓ Podés rendir el final' : '✗ Faltan correlativas para el final'}
        </div>
      )}

      {bloqueada && materia.correlativasCursar.length > 0 && (
        <div className="mt-2 text-xs text-slate-500">
          Necesitás:{' '}
          {materia.correlativasCursar.map(id => {
            const m = MATERIAS.find(x => x.id === id)
            return (
              <span key={id} className="inline-block bg-slate-700 rounded px-1 mr-1 mt-0.5">
                {m ? m.id : id}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

function getProximoEstado(estado) {
  const map = {
    [ESTADOS.DISPONIBLE]: 'Cursando',
    [ESTADOS.CURSANDO]: 'Regular',
    [ESTADOS.REGULAR]: 'Aprobada',
    [ESTADOS.APROBADA]: 'Disponible (reset)',
  }
  return map[estado] || ''
}
