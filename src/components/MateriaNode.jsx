import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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

const OPCIONES = [
  ESTADOS.DISPONIBLE,
  ESTADOS.CURSANDO,
  ESTADOS.REGULAR,
  ESTADOS.FINAL_PENDIENTE,
  ESTADOS.APROBADA,
]

export function MateriaNode({ data }) {
  const { theme: t } = useTheme()
  const { materia, estado, onFijar, puedeRendirFinal, correlativasFaltantes } = data
  const cfg      = t.estados[estado] || t.estados[ESTADOS.BLOQUEADA]
  const bloqueada = estado === ESTADOS.BLOQUEADA

  const [abierto,   setAbierto]   = useState(false)
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 })
  const nodeRef   = useRef(null)
  const pickerRef = useRef(null)

  // Cerrar al clickear fuera del nodo Y del picker (portal)
  useEffect(() => {
    if (!abierto) return
    function onDown(e) {
      const fueraDeNodo   = nodeRef.current   && !nodeRef.current.contains(e.target)
      const fueraDePicker = pickerRef.current && !pickerRef.current.contains(e.target)
      if (fueraDeNodo && fueraDePicker) setAbierto(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  function handleClick(e) {
    if (bloqueada) return
    e.stopPropagation()
    if (!abierto) {
      const rect = nodeRef.current.getBoundingClientRect()
      setPickerPos({ top: rect.bottom + 6, left: rect.left })
    }
    setAbierto(prev => !prev)
  }

  function handleSelect(e, nuevoEstado) {
    e.stopPropagation()
    onFijar(nuevoEstado)
    setAbierto(false)
  }

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div ref={nodeRef}>
        <div
          onClick={handleClick}
          style={{
            background: cfg.bg,
            border: `1px solid ${abierto ? t.borderActive : cfg.border}`,
            cursor: bloqueada ? 'default' : 'pointer',
            width: 200,
            borderRadius: 8,
            padding: '10px 12px',
            transition: 'border-color 0.15s ease, opacity 0.15s ease',
            opacity: bloqueada ? 0.4 : 1,
            userSelect: 'none',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 6 }}>
            <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: cfg.badgeText, opacity: 0.6, fontWeight: 600, letterSpacing: '0.5px', marginTop: 1 }}>
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
              {materia.nota || 'Requiere completar el plan de estudios'}
            </p>
          )}
          {materia.esOptativa && (
            <p style={{ fontSize: 9, color: cfg.badgeText, opacity: 0.5, marginTop: 4 }}>Optativa</p>
          )}

          {/* Puntito indicador */}
          {!bloqueada && (
            <div style={{
              position: 'absolute',
              top: 8, right: 8,
              width: 5, height: 5,
              borderRadius: '50%',
              background: abierto ? t.accent : cfg.border,
              opacity: abierto ? 1 : 0.4,
              transition: 'background 0.15s, opacity 0.15s',
            }} />
          )}
        </div>
      </div>

      {/* Picker renderizado como portal en document.body — fuera del DOM de ReactFlow */}
      {abierto && createPortal(
        <div
          ref={pickerRef}
          onMouseDown={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: pickerPos.top,
            left: pickerPos.left,
            zIndex: 99999,
            width: 200,
            background: t.header,
            border: `1px solid ${t.borderActive}`,
            borderRadius: 8,
            padding: 6,
            boxShadow: t.name === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.7)'
              : '0 8px 24px rgba(0,0,0,0.18)',
            animation: 'scaleIn 0.12s cubic-bezier(0.22,1,0.36,1) both',
            transformOrigin: 'top left',
          }}
        >
          <p style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: t.textMuted, letterSpacing: '1px', textTransform: 'uppercase', margin: '2px 6px 6px', userSelect: 'none' }}>
            Cambiar estado
          </p>
          {OPCIONES.map(op => {
            const opCfg  = t.estados[op]
            const activo = estado === op
            return (
              <button
                key={op}
                onClick={e => handleSelect(e, op)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '6px 8px',
                  textAlign: 'left',
                  background: activo ? opCfg.bg : 'transparent',
                  border: `1px solid ${activo ? opCfg.border : 'transparent'}`,
                  borderRadius: 5,
                  color: activo ? opCfg.text : t.textMuted,
                  fontSize: 11,
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  cursor: 'pointer',
                  marginBottom: 2,
                  transition: 'background 0.1s, color 0.1s',
                  userSelect: 'none',
                }}
                onMouseEnter={e => {
                  if (!activo) {
                    e.currentTarget.style.background = opCfg.bg
                    e.currentTarget.style.color = opCfg.text
                  }
                }}
                onMouseLeave={e => {
                  if (!activo) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = t.textMuted
                  }
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: opCfg.border, flexShrink: 0 }} />
                {ESTADO_LABELS[op]}
                {activo && (
                  <span style={{ marginLeft: 'auto', fontSize: 9, color: opCfg.badgeText, opacity: 0.6 }}>actual</span>
                )}
              </button>
            )
          })}
        </div>,
        document.body
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  )
}
