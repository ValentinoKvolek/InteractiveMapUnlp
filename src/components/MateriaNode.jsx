import { Handle, Position } from '@xyflow/react'
import { ESTADOS } from '../hooks/useCarrera'

const ESTADO_STYLE = {
  [ESTADOS.BLOQUEADA]: {
    bg: '#1e293b',
    border: '#334155',
    text: '#64748b',
    badge: { bg: '#0f172a', text: '#475569' },
    icon: '🔒',
    label: 'Bloqueada',
    glow: null,
  },
  [ESTADOS.DISPONIBLE]: {
    bg: '#1e3a5f',
    border: '#3b82f6',
    text: '#bfdbfe',
    badge: { bg: '#1d4ed8', text: '#bfdbfe' },
    icon: '📋',
    label: 'Disponible',
    glow: '0 0 12px rgba(59,130,246,0.35)',
  },
  [ESTADOS.CURSANDO]: {
    bg: '#422006',
    border: '#f59e0b',
    text: '#fef3c7',
    badge: { bg: '#b45309', text: '#fef3c7' },
    icon: '📖',
    label: 'Cursando',
    glow: '0 0 12px rgba(245,158,11,0.4)',
  },
  [ESTADOS.REGULAR]: {
    bg: '#431407',
    border: '#f97316',
    text: '#ffedd5',
    badge: { bg: '#c2410c', text: '#ffedd5' },
    icon: '📝',
    label: 'Regular',
    glow: '0 0 12px rgba(249,115,22,0.4)',
  },
  [ESTADOS.FINAL_PENDIENTE]: {
    bg: '#2e1065',
    border: '#a855f7',
    text: '#e9d5ff',
    badge: { bg: '#7e22ce', text: '#e9d5ff' },
    icon: '⏳',
    label: 'Final pendiente',
    glow: '0 0 14px rgba(168,85,247,0.45)',
  },
  [ESTADOS.APROBADA]: {
    bg: '#052e16',
    border: '#22c55e',
    text: '#bbf7d0',
    badge: { bg: '#15803d', text: '#bbf7d0' },
    icon: '✅',
    label: 'Aprobada',
    glow: '0 0 16px rgba(34,197,94,0.45)',
  },
}

export function MateriaNode({ data }) {
  const { materia, estado, onAvanzar, puedeRendirFinal, correlativasFaltantes } = data
  const cfg = ESTADO_STYLE[estado] || ESTADO_STYLE[ESTADOS.BLOQUEADA]
  const bloqueada = estado === ESTADOS.BLOQUEADA

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div
        onClick={bloqueada ? undefined : onAvanzar}
        style={{
          background: cfg.bg,
          border: `2px solid ${cfg.border}`,
          boxShadow: cfg.glow || 'none',
          cursor: bloqueada ? 'not-allowed' : 'pointer',
          width: 200,
          borderRadius: 12,
          padding: '10px 12px',
          transition: 'all 0.2s ease',
          opacity: bloqueada ? 0.55 : 1,
          userSelect: 'none',
        }}
      >
        {/* Header: código + badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#64748b', fontWeight: 600 }}>
            {materia.id}
          </span>
          <span style={{
            fontSize: 10,
            background: cfg.badge.bg,
            color: cfg.badge.text,
            borderRadius: 6,
            padding: '2px 6px',
            fontWeight: 600,
          }}>
            {cfg.icon} {cfg.label}
          </span>
        </div>

        {/* Nombre */}
        <p style={{ fontSize: 12, fontWeight: 600, color: cfg.text, lineHeight: 1.35, margin: 0 }}>
          {materia.nombre}
        </p>

        {/* Regular: aviso de si puede rendir */}
        {estado === ESTADOS.REGULAR && (
          <div style={{
            marginTop: 6, fontSize: 10, padding: '3px 6px', borderRadius: 6,
            background: puedeRendirFinal ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            color: puedeRendirFinal ? '#86efac' : '#fca5a5',
          }}>
            {puedeRendirFinal ? '✓ Podés rendir el final' : '✗ Faltan correlativas para rendir'}
          </div>
        )}

        {/* Final pendiente: muestra qué correlativas faltan acreditar */}
        {estado === ESTADOS.FINAL_PENDIENTE && (
          <div style={{ marginTop: 6 }}>
            <div style={{
              fontSize: 10, padding: '3px 6px', borderRadius: 6,
              background: 'rgba(239,68,68,0.15)', color: '#fca5a5', marginBottom: 4,
            }}>
              ⏳ Final rendido · no acreditado aún
            </div>
            {correlativasFaltantes && correlativasFaltantes.length > 0 && (
              <div style={{ fontSize: 9, color: '#94a3b8' }}>
                Debés el final de:{' '}
                {correlativasFaltantes.map(m => (
                  <span key={m.id} style={{
                    display: 'inline-block', background: '#1e293b',
                    borderRadius: 4, padding: '1px 4px', marginRight: 2, marginTop: 2,
                    color: '#a855f7',
                  }}>
                    {m.id}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {materia.esTesina && (
          <p style={{ fontSize: 9, color: '#64748b', marginTop: 4 }}>
            Requiere 1° y 2° año + 2 finales extra
          </p>
        )}
        {materia.esOptativa && (
          <p style={{ fontSize: 9, color: '#64748b', marginTop: 4 }}>Materia optativa</p>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  )
}
