import { useEffect, useRef, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from '@dagrejs/dagre'
import { ESTADOS } from '../hooks/useCarrera'
import { useTheme } from '../context/ThemeContext'
import { MateriaNode } from './MateriaNode'

const NODE_W = 200
const NODE_H = 95

function buildLayout(materias) {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 80 })
  for (const m of materias) g.setNode(m.id, { width: NODE_W, height: NODE_H })
  for (const m of materias)
    for (const corrId of m.correlativasCursar) g.setEdge(corrId, m.id)
  dagre.layout(g)
  const positions = {}
  for (const m of materias) {
    const pos = g.node(m.id)
    positions[m.id] = { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2 }
  }
  return positions
}

const EDGE_COLOR = {
  [ESTADOS.APROBADA]: '#2d5a2d',
  [ESTADOS.REGULAR]: '#8b1a1a',
  [ESTADOS.CURSANDO]: '#7a4a1a',
  [ESTADOS.DISPONIBLE]: '#5c2020',
  [ESTADOS.BLOQUEADA]: '#2a1515',
  [ESTADOS.FINAL_PENDIENTE]: '#b22222',
}

const nodeTypes = { materia: MateriaNode }

const PRIORIDAD_FOCO = [ESTADOS.CURSANDO, ESTADOS.FINAL_PENDIENTE, ESTADOS.REGULAR, ESTADOS.DISPONIBLE, ESTADOS.APROBADA]

function getIdsParaFoco(progreso, materias) {
  for (const estado of PRIORIDAD_FOCO) {
    const ids = materias.filter(m => progreso[m.id] === estado).map(m => m.id)
    if (ids.length > 0) return ids
  }
  return materias.map(m => m.id)
}

function FlowInner({ materias, progreso, fijarEstado, puedeRendirFinal, correlativasFinalFaltantes, theme: t }) {
  const { fitView } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const initialFitDone = useRef(false)

  // Layout se recalcula solo cuando cambia la carrera (materias)
  const positions = useMemo(() => buildLayout(materias), [materias])

  useEffect(() => {
    // Reset fit cuando cambia la carrera
    initialFitDone.current = false
  }, [materias])

  useEffect(() => {
    const newNodes = materias.map(m => ({
      id: m.id,
      type: 'materia',
      position: positions[m.id],
      data: {
        materia: m,
        estado: progreso[m.id],
        onFijar: (estado) => fijarEstado(m.id, estado),
        puedeRendirFinal: puedeRendirFinal(m.id),
        correlativasFaltantes: correlativasFinalFaltantes(m.id),
      },
    }))


    const newEdges = []
    for (const m of materias) {
      for (const corrId of m.correlativasCursar) {
        const sourceEstado = progreso[corrId] || ESTADOS.BLOQUEADA
        const color = t.edges[sourceEstado] || t.border
        newEdges.push({
          id: `${corrId}->${m.id}`,
          source: corrId,
          target: m.id,
          type: 'smoothstep',
          animated: sourceEstado === ESTADOS.CURSANDO || sourceEstado === ESTADOS.REGULAR,
          style: {
            stroke: color,
            strokeWidth: sourceEstado === ESTADOS.APROBADA ? 2.5 : 1.5,
            opacity: sourceEstado === ESTADOS.BLOQUEADA ? 0.25 : 0.75,
          },
          markerEnd: { type: MarkerType.ArrowClosed, color, width: 10, height: 10 },
        })
      }
    }

    setNodes(newNodes)
    setEdges(newEdges)

    if (!initialFitDone.current) {
      initialFitDone.current = true
      const idsFoco = getIdsParaFoco(progreso, materias)
      setTimeout(() => {
        fitView({ nodes: idsFoco.map(id => ({ id })), duration: 600, padding: 0.35, maxZoom: 1.1 })
      }, 80)
    }
  }, [materias, progreso, fijarEstado, puedeRendirFinal, correlativasFinalFaltantes, positions, setNodes, setEdges, fitView, t])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      minZoom={0.15}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
    >
      <Background variant="dots" color={t.diagramaDots} gap={28} size={1} style={{ background: t.diagramaBg }} />
      <Controls style={{ background: t.controlsBg, border: `1px solid ${t.border}`, borderRadius: 6, overflow: 'hidden' }} />
      <MiniMap
        nodeColor={node => {
          const est = node.data?.estado
          return t.estados[est]?.border || t.border
        }}
        style={{ background: t.minimapBg, border: `1px solid ${t.border}`, borderRadius: 6 }}
        maskColor={t.name === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(200,180,180,0.4)'}
        pannable
        zoomable
      />
    </ReactFlow>
  )
}

export function DiagramaCarrera({ materias, progreso, fijarEstado, puedeRendirFinal, correlativasFinalFaltantes }) {
  const { theme } = useTheme()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlowProvider>
        <FlowInner
          materias={materias}
          progreso={progreso}
          fijarEstado={fijarEstado}
          puedeRendirFinal={puedeRendirFinal}
          correlativasFinalFaltantes={correlativasFinalFaltantes}
          theme={theme}
        />
      </ReactFlowProvider>
    </div>
  )
}

