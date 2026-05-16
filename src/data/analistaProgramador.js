export const CARRERA_INFO = {
  id: 'APU',
  nombre: 'Analista Programador Universitario',
  titulo: 'Analista Programador Universitario',
  color: '#d97706',
  colorGlow: 'rgba(217,119,6,0.4)',
  plan: 'Plan 2021',
}

export const MATERIAS = [
  // ── Cursos introductorios ──────────────────────────────────────────────────
  { id: 'CNE', nombre: 'Expresión de Problemas y Algoritmos',    año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },
  { id: 'CNC', nombre: 'Conceptos de Organización de Computadoras', año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },
  { id: 'CNM', nombre: 'Matemática 0',                            año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },

  // ── 1° año, 1er semestre ───────────────────────────────────────────────────
  { id: 'SI106', nombre: 'Conceptos de Algoritmos, Datos y Programas', año: 1, semestre: 1, correlativasCursar: ['CNE'], correlativasFinal: ['CNE'] },
  { id: 'SI104', nombre: 'Organización de Computadoras',               año: 1, semestre: 1, correlativasCursar: ['CNC'], correlativasFinal: ['CNC'] },
  { id: 'SI101', nombre: 'Matemática 1',                               año: 1, semestre: 1, correlativasCursar: ['CNM'], correlativasFinal: ['CNM'] },

  // ── 1° año, 2do semestre ───────────────────────────────────────────────────
  { id: 'SI107', nombre: 'Taller de Programación',       año: 1, semestre: 2, correlativasCursar: ['SI106'], correlativasFinal: ['SI106'] },
  { id: 'SI105', nombre: 'Arquitectura de Computadoras', año: 1, semestre: 2, correlativasCursar: ['SI104'], correlativasFinal: ['SI104'] },
  { id: 'SI102', nombre: 'Matemática 2',                 año: 1, semestre: 2, correlativasCursar: ['SI101'], correlativasFinal: ['SI101'] },

  // ── 2° año, 3er semestre ───────────────────────────────────────────────────
  { id: 'SI209', nombre: 'Fundamentos de Organización de Datos', año: 2, semestre: 3, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },
  { id: 'SI203', nombre: 'Algoritmos y Estructuras de Datos',    año: 2, semestre: 3, correlativasCursar: ['SI102', 'SI107'], correlativasFinal: ['SI102', 'SI107'] },
  { id: 'SI207', nombre: 'Seminario de Lenguajes',               año: 2, semestre: 3, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },

  // ── 2° año, 4to semestre ───────────────────────────────────────────────────
  { id: 'SI210', nombre: 'Diseño de Bases de Datos',                    año: 2, semestre: 4, correlativasCursar: ['SI209'], correlativasFinal: ['SI209'] },
  { id: 'SI202', nombre: 'Ingeniería de Software 1',                    año: 2, semestre: 4, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },
  { id: 'SI206', nombre: 'Orientación a Objetos 1',                     año: 2, semestre: 4, correlativasCursar: ['SI107'], correlativasFinal: ['SI107'] },
  { id: 'SI204', nombre: 'Introducción a los Sistemas Operativos',      año: 2, semestre: 4, correlativasCursar: ['SI107', 'SI105'], correlativasFinal: ['SI107', 'SI105'] },
  { id: 'SI208', nombre: 'Taller de Lecto-comprensión en Inglés',       año: 2, semestre: 4, correlativasCursar: [], correlativasFinal: [] },

  // ── 3° año, 5to semestre ───────────────────────────────────────────────────
  { id: 'SI308', nombre: 'Matemática 3',           año: 3, semestre: 5, correlativasCursar: ['SI102'], correlativasFinal: ['SI102'] },
  { id: 'SI302', nombre: 'Ingeniería de Software 2', año: 3, semestre: 5, correlativasCursar: ['SI202', 'SI208'], correlativasFinal: ['SI202', 'SI208'] },
  { id: 'SI307', nombre: 'Orientación a Objetos 2',  año: 3, semestre: 5, correlativasCursar: ['SI206', 'SI208'], correlativasFinal: ['SI206', 'SI208'] },

  // ── 3° año, 6to semestre ───────────────────────────────────────────────────
  { id: 'SI301',   nombre: 'Programación Concurrente',                    año: 3, semestre: 6, correlativasCursar: ['SI204', 'SI207', 'SI208'], correlativasFinal: ['SI204', 'SI207', 'SI208'] },
  { id: 'SI305',   nombre: 'Proyecto de Software',                        año: 3, semestre: 6, correlativasCursar: ['SI210', 'SI202', 'SI203', 'SI206', 'SI207', 'SI208'], correlativasFinal: ['SI210', 'SI202', 'SI203', 'SI206', 'SI207', 'SI208'] },
  { id: 'O7301',   nombre: 'Taller de Tecnologías de Producción de Software', año: 3, semestre: 6, correlativasCursar: ['SI210', 'SI203', 'SI204', 'SI206', 'SI208', 'SI302'], correlativasFinal: ['SI210', 'SI203', 'SI204', 'SI206', 'SI208', 'SI302'] },
  { id: 'ELEC_APU', nombre: 'Electiva',                                   año: 3, semestre: 6, correlativasCursar: [], correlativasFinal: [], esOptativa: true },
]

export const SEMESTRES_INFO = {
  0: { label: 'Cursos Introductorios' },
  1: { label: '1° Año · 1er Semestre' },
  2: { label: '1° Año · 2do Semestre' },
  3: { label: '2° Año · 3er Semestre' },
  4: { label: '2° Año · 4to Semestre' },
  5: { label: '3° Año · 5to Semestre' },
  6: { label: '3° Año · 6to Semestre' },
}
