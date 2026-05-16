export const CARRERA_INFO = {
  id: 'CDO',
  nombre: 'Ciencia de Datos en Organizaciones',
  titulo: 'Licenciado/a en Ciencia de Datos en Organizaciones',
  color: '#0d9488',
  colorGlow: 'rgba(13,148,136,0.4)',
  plan: 'Plan 2024',
}

export const MATERIAS = [
  // ── 1° año, 1er semestre ───────────────────────────────────────────────────
  { id: 'I101', nombre: 'Algoritmos y Programación I',          año: 1, semestre: 1, correlativasCursar: [], correlativasFinal: [] },
  { id: 'X102', nombre: 'Matemática A',                         año: 1, semestre: 1, correlativasCursar: [], correlativasFinal: [] },
  { id: 'E103', nombre: 'Gestión de las Organizaciones',        año: 1, semestre: 1, correlativasCursar: [], correlativasFinal: [] },

  // ── 1° año, 2do semestre ───────────────────────────────────────────────────
  { id: 'I104', nombre: 'Algoritmos y Programación II',         año: 1, semestre: 2, correlativasCursar: ['I101'], correlativasFinal: ['I101'] },
  { id: 'X105', nombre: 'Matemática B',                         año: 1, semestre: 2, correlativasCursar: ['X102'], correlativasFinal: ['X102'] },
  { id: 'E106', nombre: 'Economía y Medición Económica',        año: 1, semestre: 2, correlativasCursar: ['X102', 'E103'], correlativasFinal: ['X102', 'E103'] },

  // ── 2° año, 3er semestre ───────────────────────────────────────────────────
  { id: 'I201', nombre: 'Taller de Lenguajes',                  año: 2, semestre: 3, correlativasCursar: ['I104'], correlativasFinal: ['I104'] },
  { id: 'I202', nombre: 'Introducción a Base de Datos',         año: 2, semestre: 3, correlativasCursar: ['I104'], correlativasFinal: ['I104'] },
  { id: 'E203', nombre: 'Contabilidad e Interpretación de Estados Contables', año: 2, semestre: 3, correlativasCursar: ['E106'], correlativasFinal: ['E106'] },
  { id: 'X204', nombre: 'Matemática C',                         año: 2, semestre: 3, correlativasCursar: ['X105'], correlativasFinal: ['X105'] },

  // ── 2° año, 4to semestre ───────────────────────────────────────────────────
  { id: 'I205', nombre: 'Base de Datos',                        año: 2, semestre: 4, correlativasCursar: ['I202'], correlativasFinal: ['I202'] },
  { id: 'E206', nombre: 'Procesos de Negocio',                  año: 2, semestre: 4, correlativasCursar: ['E203'], correlativasFinal: ['E203'] },
  { id: 'X207', nombre: 'Matemática D',                         año: 2, semestre: 4, correlativasCursar: ['X204'], correlativasFinal: ['X204'] },
  { id: 'O208', nombre: 'Inglés (Lecto-comprensión)',           año: 2, semestre: 4, correlativasCursar: [], correlativasFinal: [] },

  // ── 3° año, 5to semestre ───────────────────────────────────────────────────
  { id: 'I301', nombre: 'Fundamentos de Arquitectura de Computadoras, Sistemas Operativos y Redes', año: 3, semestre: 5, correlativasCursar: ['I104', 'O208'], correlativasFinal: ['I104', 'O208'] },
  { id: 'I302', nombre: 'Ingeniería de Software',               año: 3, semestre: 5, correlativasCursar: ['I201', 'O208'], correlativasFinal: ['I201', 'O208'] },
  { id: 'E303', nombre: 'Costos e Información para la Gestión', año: 3, semestre: 5, correlativasCursar: ['X105', 'E203', 'O208'], correlativasFinal: ['X105', 'E203', 'O208'] },
  { id: 'E304', nombre: 'Gestión de Personas y Equipos',        año: 3, semestre: 5, correlativasCursar: ['X105', 'E203', 'O208'], correlativasFinal: ['X105', 'E203', 'O208'] },

  // ── 3° año, 6to semestre ───────────────────────────────────────────────────
  { id: 'I305', nombre: 'Visualización de Grandes Volúmenes de Datos', año: 3, semestre: 6, correlativasCursar: ['X207', 'O208'], correlativasFinal: ['X207', 'O208'] },
  { id: 'I306', nombre: 'Minería de Datos y Aprendizaje Automático',   año: 3, semestre: 6, correlativasCursar: ['I201', 'X207', 'O208'], correlativasFinal: ['I201', 'X207', 'O208'] },
  { id: 'E307', nombre: 'Tecnologías para la Gestión',                 año: 3, semestre: 6, correlativasCursar: ['X204', 'E206', 'O208'], correlativasFinal: ['X204', 'E206', 'O208'] },

  // ── 4° año, 7mo semestre ───────────────────────────────────────────────────
  { id: 'I401', nombre: 'Conceptos y Aplicaciones en Big Data',        año: 4, semestre: 7, correlativasCursar: ['I201', 'X207', 'O208'], correlativasFinal: ['I201', 'X207', 'O208'] },
  { id: 'E402', nombre: 'Finanzas de Empresas',                        año: 4, semestre: 7, correlativasCursar: ['X207', 'E303'], correlativasFinal: ['X207', 'E303'] },
  { id: 'E403', nombre: 'Estrategia de Tecnología y Gestión de Proyectos', año: 4, semestre: 7, correlativasCursar: ['X207', 'E307', 'O208'], correlativasFinal: ['X207', 'E307', 'O208'] },
  { id: 'E404', nombre: 'Marketing Estratégico y Operativo',           año: 4, semestre: 7, correlativasCursar: ['E206', 'X207', 'O208', 'E304'], correlativasFinal: ['E206', 'X207', 'O208', 'E304'] },

  // ── 4° año, 8vo semestre ───────────────────────────────────────────────────
  { id: 'I405', nombre: 'Aplicaciones de Inteligencia de Datos en Organizaciones', año: 4, semestre: 8, correlativasCursar: ['I306'], correlativasFinal: ['I306'] },
  { id: 'E406', nombre: 'Dirección General',                           año: 4, semestre: 8, correlativasCursar: ['X207', 'E303', 'E304', 'E307'], correlativasFinal: ['X207', 'E303', 'E304', 'E307'] },
  { id: 'O407', nombre: 'Optativa',                                    año: 4, semestre: 8, correlativasCursar: [], correlativasFinal: [], esOptativa: true },
  { id: 'O408', nombre: 'Práctica Profesional Supervisada',            año: 4, semestre: 8, correlativasCursar: [], correlativasFinal: [], esTesina: true, nota: 'Requiere 13 asignaturas aprobadas.' },
]

export const SEMESTRES_INFO = {
  1: { label: '1° Año · 1er Semestre' },
  2: { label: '1° Año · 2do Semestre' },
  3: { label: '2° Año · 3er Semestre' },
  4: { label: '2° Año · 4to Semestre' },
  5: { label: '3° Año · 5to Semestre' },
  6: { label: '3° Año · 6to Semestre' },
  7: { label: '4° Año · 7mo Semestre' },
  8: { label: '4° Año · 8vo Semestre' },
}
