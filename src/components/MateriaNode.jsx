import { Handle, Position } from '@xyflow/react'
import { ESTADOS } from '../hooks/useCarrera'
import { useTheme } from '../context/ThemeContext'

const ESTADO_LABELS = {
  [ESTADOS.BLOQUEADA]:       'Bloqueada',
  [ESTADOS.DISPONIBLE]:      'Disponible',
  [ESTADOS.CURSANDO]:        'Cursando',
  [ESTADOS.REGULAR]:         'Regular',
  [ESTADOS.FINAL_PENDIENTE]: 'Final pendiente',
  [ESTADOS.APROBADA]:        'Aprobada',
}

export function MateriaNode({ data }) {
  const { theme: t } = useTheme()
  const { materia, estado, onAvanzar, puedeRendirFinal, correlativasFaltantes } = data
  const cfg = t.estados[estado] || t.estados[ESTADOS.BLOQUEADA]
  const bloqueada = estado === ESTADOS.BLOQUEADA

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div
        onClick={bloqueada ? undefined : onAvanzar}
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          cursor: bloqueada ? 'default' : 'pointer',
          width: 200,
          borderRadius: 8,
          padding: '10px 12px',
          transition: 'border-color 0.15s ease, opacity 0.15s ease',
          opacity: bloqueada ? 0.4 : 1,
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 6 }}>
          <span style={{ fontSize: 9, fontFamily: 'monospace', color: cfg.badgeText, opacity: 0.6, fontWeight: 600, letterSpacing: '0.5px', marginTop: 1 }}>
            {materia.id}
          </span>
          <span style={{ fontSize: 9, background: cfg.badgeBg, color: cfg.badgeText, border: `1px solid ${cfg.border}`, borderRadius: 4, padding: '1px 5px', fontWeight: 600, letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
            {ESTADO_LABELS[estado]}
          </span>
        </div>

        <p style={{ fontSize: 11, fontWeight: 500, color: cfg.text, lineHeight: 1.4, margin: 0 }}>
          {materia.nombre}
        </p>

        {estado === ESTADOS.REGULAR && (
          <p style={{ marginTop: 6, fontSize: 9, color: puedeRendirFinal ? '#6a9a6a' : '#8b4444', borderTop: `1px solid ${cfg.border}`, paddingTop: 5 }}>
            {puedeRendirFinal ? 'Habilitado para rendir final' : 'Faltan correlativas para rendir'}
          </p>
        )}

        {estado === ESTADOS.FINAL_PENDIENTE && (
          <div style={{ marginTop: 6, borderTop: `1px solid ${cfg.border}`, paddingTop: 5 }}>
            <p style={{ fontSize: 9, color: cfg.text, opacity: 0.7, margin: '0 0 4px' }}>
              Final rendido — pendiente de acreditación
            </p>
            {correlativasFaltantes?.length > 0 && (
              <p style={{ fontSize: 9, color: cfg.badgeText, opacity: 0.6, margin: 0 }}>
                Debe:{' '}
                {correlativasFaltantes.map((m, i) => (
                  <span key={m.id}>
                    <span style={{ opacity: 1, color: cfg.text }}>{m.id}</span>
                    {i < correlativasFaltantes.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
          </div>
        )}

        {materia.esTesina && (
          <p style={{ fontSize: 9, color: cfg.badgeText, opacity: 0.5, marginTop: 5, borderTop: `1px solid ${cfg.border}`, paddingTop: 4 }}>
            Requiere 1° y 2° año + 2 finales adicionales
          </p>
        )}
        {materia.esOptativa && (
          <p style={{ fontSize: 9, color: cfg.badgeText, opacity: 0.5, marginTop: 4 }}>Optativa</p>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  )
}
