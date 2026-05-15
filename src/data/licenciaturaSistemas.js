export const CARRERA_INFO = {
  id: 'LS',
  nombre: 'Licenciatura en Sistemas',
  titulo: 'Licenciado/a en Sistemas',
  color: '#10b981',
  colorGlow: 'rgba(16,185,129,0.4)',
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
  { id: 'S0303', nombre: 'Bases de Datos 1', año: 3, semestre: 6, correlativasCursar: ['SI210', 'SI208'], correlativasFinal: ['SI210', 'SI208'] },

  // ── 4° año, 7mo cuatrimestre ───────────────────────────────────────────────
  { id: 'S0407', nombre: 'Fundamentos de la Teoría de la Computación', año: 4, semestre: 7, correlativasCursar: ['SI308', 'SI306'], correlativasFinal: ['SI308', 'SI306'] },
  { id: 'SI403', nombre: 'Sistemas Operativos', año: 4, semestre: 7, correlativasCursar: ['SI304'], correlativasFinal: ['SI304'] },
  { id: 'SI405', nombre: 'Bases de Datos 2', año: 4, semestre: 7, correlativasCursar: ['S0303'], correlativasFinal: ['S0303'] },
  { id: 'S0406', nombre: 'Ingeniería de Software 3', año: 4, semestre: 7, correlativasCursar: ['SI308', 'SI202'], correlativasFinal: ['SI308', 'SI202'] },

  // ── 4° año, 8vo cuatrimestre ───────────────────────────────────────────────
  { id: 'S0410', nombre: 'Sistemas y Organizaciones', año: 4, semestre: 8, correlativasCursar: ['SI210', 'SI202', 'SI208'], correlativasFinal: ['SI210', 'SI202', 'SI208'] },
  { id: 'SI409', nombre: 'Matemática 4', año: 4, semestre: 8, correlativasCursar: ['SI308'], correlativasFinal: ['SI308'] },
  { id: 'S0408', nombre: 'Desarrollo de Software en Sistemas Distribuidos', año: 4, semestre: 8, correlativasCursar: ['SI301', 'S0303', 'SI304'], correlativasFinal: ['SI301', 'S0303', 'SI304'] },
  { id: 'OPT1_LS', nombre: 'Optativa 1', año: 4, semestre: 8, correlativasCursar: [], correlativasFinal: [], esOptativa: true },

  // ── 5° año, 9no cuatrimestre ───────────────────────────────────────────────
  { id: 'SI504', nombre: 'Aspectos Sociales y Profesionales de Informática', año: 5, semestre: 9, correlativasCursar: ['SI305'], correlativasFinal: ['SI305'] },
  { id: 'SI505', nombre: 'Aspectos Éticos, Sociales y Profesionales Avanzados', año: 5, semestre: 9, correlativasCursar: ['SI305'], correlativasFinal: ['SI305'] },
  { id: 'OPT2_LS', nombre: 'Optativa 2', año: 5, semestre: 9, correlativasCursar: [], correlativasFinal: [], esOptativa: true },
  { id: 'LS503', nombre: 'Tesina de Licenciatura en Sistemas', año: 5, semestre: 9, correlativasCursar: [], correlativasFinal: [], esTesina: true, nota: 'Requiere todos los finales de 1° y 2° año + mín. 2 finales adicionales' },
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
