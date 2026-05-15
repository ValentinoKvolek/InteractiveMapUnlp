export const CARRERA_INFO = {
  id: 'LI',
  nombre: 'Licenciatura en Informática',
  titulo: 'Licenciado/a en Informática',
  color: '#6366f1',
  colorGlow: 'rgba(99,102,241,0.4)',
  plan: 'Plan 2021',
}

export const MATERIAS = [
  // ── Cursos introductorios ──────────────────────────────────────────────────
  { id: 'CNE', nombre: 'Expresión de Problemas y Algoritmos', año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },
  { id: 'CNC', nombre: 'Conceptos de Organización de Computadoras', año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },
  { id: 'CNM', nombre: 'Matemática 0', año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },

  // ── 1° año, 1er cuatrimestre ───────────────────────────────────────────────
  { id: 'SI106', nombre: 'Conceptos de Algoritmos, Datos y Programas', año: 1, semestre: 1, correlativasCursar: ['CNE'], correlativasFinal: ['CNE'] },
  { id: 'SI104', nombre: 'Organización de Computadoras', año: 1, semestre: 1, correlativasCursar: ['CNC'], correlativasFinal: ['CNC'] },
  { id: 'SI101', nombre: 'Matemática 1', año: 1, semestre: 1, correlativasCursar: ['CNM'], correlativasFinal: ['CNM'] },

  // ── 1° año, 2do cuatrimestre ───────────────────────────────────────────────
  { id: 'SI107', nombre: 'Taller de Programación', año: 1, semestre: 2, correlativasCursar: ['SI106'], correlativasFinal: ['SI106'] },
  { id: 'SI105', nombre: 'Arquitectura de Computadoras', año: 1, semestre: 2, correlativasCursar: ['SI104'], correlativasFinal: ['SI104'] },
  { id: 'SI102', nombre: 'Matemática 2', año: 1, semestre: 2, correlativasCursar: ['SI101'], correlativasFinal: ['SI101'] },

  // ── 2° año, 3er cuatrimestre ───────────────────────────────────────────────
  { id: 'SI209', nombre: 'Fundamentos de Organización de Datos', año: 2, semestre: 3, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },
  { id: 'SI203', nombre: 'Algoritmos y Estructuras de Datos', año: 2, semestre: 3, correlativasCursar: ['SI102', 'SI107'], correlativasFinal: ['SI102', 'SI107'] },
  { id: 'SI207', nombre: 'Seminario de Lenguajes', año: 2, semestre: 3, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },

  // ── 2° año, 4to cuatrimestre ───────────────────────────────────────────────
  { id: 'SI210', nombre: 'Diseño de Bases de Datos', año: 2, semestre: 4, correlativasCursar: ['SI209'], correlativasFinal: ['SI209'] },
  { id: 'SI202', nombre: 'Ingeniería de Software 1', año: 2, semestre: 4, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },
  { id: 'SI206', nombre: 'Orientación a Objetos 1', año: 2, semestre: 4, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },
  { id: 'SI204', nombre: 'Introducción a los Sistemas Operativos', año: 2, semestre: 4, correlativasCursar: ['SI107', 'SI105'], correlativasFinal: ['SI107', 'SI105'] },
  { id: 'SI208', nombre: 'Taller de Lecto-comprensión en Inglés', año: 2, semestre: 4, correlativasCursar: [], correlativasFinal: [] },

  // ── 3° año, 5to cuatrimestre ───────────────────────────────────────────────
  { id: 'SI308', nombre: 'Matemática 3', año: 3, semestre: 5, correlativasCursar: ['SI102'], correlativasFinal: ['SI102'] },
  { id: 'SI302', nombre: 'Ingeniería de Software 2', año: 3, semestre: 5, correlativasCursar: ['SI202', 'SI208'], correlativasFinal: ['SI202', 'SI208'] },
  { id: 'SI306', nombre: 'Conceptos y Paradigmas de Lenguajes de Programación', año: 3, semestre: 5, correlativasCursar: ['SI203', 'SI207', 'SI208'], correlativasFinal: ['SI203', 'SI207', 'SI208'] },
  { id: 'SI307', nombre: 'Orientación a Objetos 2', año: 3, semestre: 5, correlativasCursar: ['SI206', 'SI208'], correlativasFinal: ['SI206', 'SI208'] },

  // ── 3° año, 6to cuatrimestre ───────────────────────────────────────────────
  { id: 'SI304', nombre: 'Redes y Comunicaciones', año: 3, semestre: 6, correlativasCursar: ['SI102', 'SI204', 'SI208'], correlativasFinal: ['SI102', 'SI204', 'SI208'] },
  { id: 'SI301', nombre: 'Programación Concurrente', año: 3, semestre: 6, correlativasCursar: ['SI204', 'SI207', 'SI208'], correlativasFinal: ['SI204', 'SI207', 'SI208'] },
  { id: 'SI305', nombre: 'Proyecto de Software', año: 3, semestre: 6, correlativasCursar: ['SI210', 'SI202', 'SI203', 'SI206', 'SI207', 'SI208'], correlativasFinal: ['SI210', 'SI202', 'SI203', 'SI206', 'SI207', 'SI208'] },
  { id: 'OI309', nombre: 'Computabilidad y Complejidad', año: 3, semestre: 6, correlativasCursar: ['SI203', 'SI308', 'SI208'], correlativasFinal: ['SI203', 'SI308', 'SI208'] },

  // ── 4° año, 7mo cuatrimestre ───────────────────────────────────────────────
  { id: 'OI401', nombre: 'Teoría de la Computación y Verificación de Programas', año: 4, semestre: 7, correlativasCursar: ['SI308', 'SI306'], correlativasFinal: ['SI308', 'SI306'] },
  { id: 'SI403', nombre: 'Sistemas Operativos', año: 4, semestre: 7, correlativasCursar: ['SI304'], correlativasFinal: ['SI304'] },
  { id: 'OI404', nombre: 'Sistemas Paralelos', año: 4, semestre: 7, correlativasCursar: ['SI301'], correlativasFinal: ['SI301'] },
  { id: 'OPT1_LI', nombre: 'Optativa 1', año: 4, semestre: 7, correlativasCursar: [], correlativasFinal: [], esOptativa: true },

  // ── 4° año, 8vo cuatrimestre ───────────────────────────────────────────────
  { id: 'OI406', nombre: 'Lógica e Inteligencia Artificial', año: 4, semestre: 8, correlativasCursar: ['SI102', 'SI306'], correlativasFinal: ['SI102', 'SI306'] },
  { id: 'SI409', nombre: 'Matemática 4', año: 4, semestre: 8, correlativasCursar: ['SI308'], correlativasFinal: ['SI308'] },
  { id: 'OI402', nombre: 'Laboratorio de Software', año: 4, semestre: 8, correlativasCursar: ['SI305'], correlativasFinal: ['SI305'] },
  { id: 'OI405', nombre: 'Programación Distribuida y Tiempo Real', año: 4, semestre: 8, correlativasCursar: ['SI306', 'SI304'], correlativasFinal: ['SI306', 'SI304'] },

  // ── 5° año, 9no cuatrimestre ───────────────────────────────────────────────
  { id: 'OI502', nombre: 'Diseño de Experiencia de Usuario', año: 5, semestre: 9, correlativasCursar: ['SI302', 'OI402'], correlativasFinal: ['SI302', 'OI402'] },
  { id: 'SI504', nombre: 'Aspectos Sociales y Profesionales de Informática', año: 5, semestre: 9, correlativasCursar: ['SI305'], correlativasFinal: ['SI305'] },
  { id: 'SI505', nombre: 'Aspectos Éticos, Sociales y Profesionales Avanzados', año: 5, semestre: 9, correlativasCursar: ['SI305'], correlativasFinal: ['SI305'] },
  { id: 'OI503', nombre: 'Tesina de Licenciatura en Informática', año: 5, semestre: 9, correlativasCursar: [], correlativasFinal: [], esTesina: true, nota: 'Requiere todos los finales de 1° y 2° año + mín. 2 finales adicionales' },
]

export const SEMESTRES_INFO = {
  0: { label: 'Cursos Introductorios' },
  1: { label: '1° Año · 1er Cuatrimestre' },
  2: { label: '1° Año · 2do Cuatrimestre' },
  3: { label: '2° Año · 3er Cuatrimestre' },
  4: { label: '2° Año · 4to Cuatrimestre' },
  5: { label: '3° Año · 5to Cuatrimestre' },
  6: { label: '3° Año · 6to Cuatrimestre' },
  7: { label: '4° Año · 7mo Cuatrimestre' },
  8: { label: '4° Año · 8vo Cuatrimestre' },
  9: { label: '5° Año · 9no Cuatrimestre' },
}
