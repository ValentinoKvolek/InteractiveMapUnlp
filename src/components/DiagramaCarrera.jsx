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
  [ESTADOS.APROBADA]: '#22c55e',
  [ESTADOS.REGULAR]: '#f97316',
  [ESTADOS.CURSANDO]: '#f59e0b',
  [ESTADOS.DISPONIBLE]: '#3b82f6',
  [ESTADOS.BLOQUEADA]: '#334155',
  [ESTADOS.FINAL_PENDIENTE]: '#a855f7',
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

function FlowInner({ materias, progreso, avanzarEstado, puedeRendirFinal, correlativasFinalFaltantes }) {
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
        onAvanzar: () => avanzarEstado(m.id),
        puedeRendirFinal: puedeRendirFinal(m.id),
        correlativasFaltantes: correlativasFinalFaltantes(m.id),
      },
    }))

    const newEdges = []
    for (const m of materias) {
      for (const corrId of m.correlativasCursar) {
        const sourceEstado = progreso[corrId] || ESTADOS.BLOQUEADA
        const color = EDGE_COLOR[sourceEstado]
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
  }, [materias, progreso, avanzarEstado, puedeRendirFinal, correlativasFinalFaltantes, positions, setNodes, setEdges, fitView])

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
      <Background variant="dots" color="#1e293b" gap={24} size={1.5} style={{ background: '#0a1628' }} />
      <Controls style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, overflow: 'hidden' }} />
      <MiniMap
        nodeColor={node => {
          const est = node.data?.estado
          return est === ESTADOS.APROBADA ? '#22c55e'
            : est === ESTADOS.REGULAR ? '#f97316'
            : est === ESTADOS.CURSANDO ? '#f59e0b'
            : est === ESTADOS.DISPONIBLE ? '#3b82f6'
            : '#1e293b'
        }}
        style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
        maskColor="rgba(0,0,0,0.5)"
        pannable
        zoomable
      />
    </ReactFlow>
  )
}

export function DiagramaCarrera({ materias, progreso, avanzarEstado, puedeRendirFinal, correlativasFinalFaltantes }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlowProvider>
        <FlowInner
          materias={materias}
          progreso={progreso}
          avanzarEstado={avanzarEstado}
          puedeRendirFinal={puedeRendirFinal}
          correlativasFinalFaltantes={correlativasFinalFaltantes}
        />
      </ReactFlowProvider>
    </div>
  )
}

