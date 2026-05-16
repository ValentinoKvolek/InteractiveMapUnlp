export const CARRERA_INFO = {
  id: 'IC',
  nombre: 'Ingeniería en Computación',
  titulo: 'Ingeniero/a en Computación',
  color: '#0369a1',
  colorGlow: 'rgba(3,105,161,0.4)',
  plan: 'Plan 2024',
}

export const MATERIAS = [
  // ── Nivelación ────────────────────────────────────────────────────────────
  { id: 'D1001', nombre: 'Matemática para Ingeniería',      año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },
  { id: 'I1001', nombre: 'Introducción a la Informática',   año: 1, semestre: 0, correlativasCursar: [], correlativasFinal: [] },

  // ── 1° año, 1er semestre ───────────────────────────────────────────────────
  { id: 'F1301', nombre: 'Matemática A',                            año: 1, semestre: 1, correlativasCursar: ['D1001'], correlativasFinal: ['D1001'] },
  { id: 'I1101', nombre: 'Programación I',                          año: 1, semestre: 1, correlativasCursar: ['I1001'], correlativasFinal: ['I1001'] },
  { id: 'I1166', nombre: 'Fundamentos de Arquitectura de Computadoras', año: 1, semestre: 1, correlativasCursar: ['I1001'], correlativasFinal: ['I1001'] },

  // ── 1° año, 2do semestre ───────────────────────────────────────────────────
  { id: 'F1302', nombre: 'Matemática B',   año: 1, semestre: 2, correlativasCursar: ['F1301'], correlativasFinal: ['F1301'] },
  { id: 'I1102', nombre: 'Programación II', año: 1, semestre: 2, correlativasCursar: ['I1101'], correlativasFinal: ['I1101'] },
  { id: 'F1303', nombre: 'Física I',        año: 1, semestre: 2, correlativasCursar: ['F1301'], correlativasFinal: ['F1301'] },

  // ── 2° año, 3er semestre ───────────────────────────────────────────────────
  { id: 'F1304', nombre: 'Matemática C',                    año: 2, semestre: 3, correlativasCursar: ['F1302'], correlativasFinal: ['F1302'] },
  { id: 'I1103', nombre: 'Programación III',                año: 2, semestre: 3, correlativasCursar: ['I1102'], correlativasFinal: ['I1102'] },
  { id: 'I1105', nombre: 'Arquitectura de Computadoras',    año: 2, semestre: 3, correlativasCursar: ['I1166'], correlativasFinal: ['I1166'] },
  { id: 'I1104', nombre: 'Taller de Lenguajes I',           año: 2, semestre: 3, correlativasCursar: ['I1102'], correlativasFinal: ['I1102'] },

  // ── 2° año, 4to semestre ───────────────────────────────────────────────────
  { id: 'F1306', nombre: 'Matemática D',                    año: 2, semestre: 4, correlativasCursar: ['F1304'], correlativasFinal: ['F1304'] },
  { id: 'F1305', nombre: 'Física II',                       año: 2, semestre: 4, correlativasCursar: ['F1302', 'F1303'], correlativasFinal: ['F1302', 'F1303'] },
  { id: 'I1106', nombre: 'Conceptos de Sistemas Operativos', año: 2, semestre: 4, correlativasCursar: ['I1102', 'I1105'], correlativasFinal: ['I1102', 'I1105'] },
  { id: 'I1107', nombre: 'Taller de Lenguajes II',          año: 2, semestre: 4, correlativasCursar: ['I1104'], correlativasFinal: ['I1104'] },

  // ── 3° año, 5to semestre ───────────────────────────────────────────────────
  { id: 'F1315', nombre: 'Probabilidades y Estadística',    año: 3, semestre: 5, correlativasCursar: ['F1302'], correlativasFinal: ['F1302'] },
  { id: 'E1282', nombre: 'Electrotecnia y Electrónica',     año: 3, semestre: 5, correlativasCursar: ['F1304', 'F1305'], correlativasFinal: ['F1304', 'F1305'] },
  { id: 'I1108', nombre: 'Conceptos de Bases de Datos',     año: 3, semestre: 5, correlativasCursar: ['I1102'], correlativasFinal: ['I1102'] },
  { id: 'E1301', nombre: 'Introducción al Diseño Lógico',   año: 3, semestre: 5, correlativasCursar: ['I1105'], correlativasFinal: ['I1105'] },

  // ── 3° año, 6to semestre ───────────────────────────────────────────────────
  { id: 'E1302', nombre: 'Introducción al Procesamiento de Señales', año: 3, semestre: 6, correlativasCursar: ['F1306'], correlativasFinal: ['F1306'] },
  { id: 'I1109', nombre: 'Taller de Arquitectura',          año: 3, semestre: 6, correlativasCursar: ['E1301'], correlativasFinal: ['E1301'] },
  { id: 'I1110', nombre: 'Ingeniería de Software',          año: 3, semestre: 6, correlativasCursar: ['I1102'], correlativasFinal: ['I1102'] },
  { id: 'E1303', nombre: 'Redes de Datos I',                año: 3, semestre: 6, correlativasCursar: ['I1106'], correlativasFinal: ['I1106'] },

  // ── 4° año, 7mo semestre ───────────────────────────────────────────────────
  { id: 'I1111', nombre: 'Concurrencia y Paralelismo',              año: 4, semestre: 7, correlativasCursar: ['I1107', 'I1106'], correlativasFinal: ['I1107', 'I1106'] },
  { id: 'E1304', nombre: 'Instrumentación y Control',               año: 4, semestre: 7, correlativasCursar: ['E1282', 'E1302'], correlativasFinal: ['E1282', 'E1302'] },
  { id: 'E1305', nombre: 'Circuitos Digitales y Microcontroladores', año: 4, semestre: 7, correlativasCursar: ['I1109'], correlativasFinal: ['I1109'] },
  { id: 'I1113', nombre: 'Economía y Emprendedorismo',              año: 4, semestre: 7, correlativasCursar: ['F1304'], correlativasFinal: ['F1304'] },

  // ── 4° año, 8vo semestre ───────────────────────────────────────────────────
  { id: 'I1114', nombre: 'Redes de Datos II',              año: 4, semestre: 8, correlativasCursar: ['E1303'], correlativasFinal: ['E1303'] },
  { id: 'I1115', nombre: 'Sistemas de Tiempo Real',        año: 4, semestre: 8, correlativasCursar: ['I1110', 'I1111'], correlativasFinal: ['I1110', 'I1111'] },
  { id: 'E1306', nombre: 'Taller de Proyecto I',           año: 4, semestre: 8, correlativasCursar: ['I1110', 'E1305'], correlativasFinal: ['I1110', 'E1305'] },
  { id: 'I1112', nombre: 'Bases de Datos',                 año: 4, semestre: 8, correlativasCursar: ['I1108'], correlativasFinal: ['I1108'] },

  // ── 5° año, 9no semestre ───────────────────────────────────────────────────
  { id: 'I1116', nombre: 'Sistemas Distribuidos y Paralelos',              año: 5, semestre: 9, correlativasCursar: ['I1111'], correlativasFinal: ['I1111'] },
  { id: 'I1117', nombre: 'Aspectos Legales de la Ingeniería Informática',  año: 5, semestre: 9, correlativasCursar: ['I1113'], correlativasFinal: ['I1113'] },
  { id: 'E1307', nombre: 'Introducción a la Arquitectura de Computadoras Cuánticas', año: 5, semestre: 9, correlativasCursar: ['E1306'], correlativasFinal: ['E1306'] },
  { id: 'OPT1_IC', nombre: 'Optativa 1', año: 5, semestre: 9, correlativasCursar: [], correlativasFinal: [], esOptativa: true },

  // ── 5° año, 10mo semestre ──────────────────────────────────────────────────
  { id: 'I1118', nombre: 'Taller de Proyecto II',          año: 5, semestre: 10, correlativasCursar: ['I1110'], correlativasFinal: ['I1110'] },
  { id: 'I1167', nombre: 'Introducción a la Programación Cuántica', año: 5, semestre: 10, correlativasCursar: ['I1105', 'I1110'], correlativasFinal: ['I1105', 'I1110'] },
  { id: 'OPT2_IC', nombre: 'Optativa 2', año: 5, semestre: 10, correlativasCursar: [], correlativasFinal: [], esOptativa: true },
  { id: 'EH_IC',  nombre: 'Electiva Humanística', año: 5, semestre: 10, correlativasCursar: [], correlativasFinal: [], esOptativa: true },
  { id: 'PPS_IC', nombre: 'Práctica Profesional Supervisada', año: 5, semestre: 10, correlativasCursar: [], correlativasFinal: [], esTesina: true, nota: 'Requiere 20 asignaturas aprobadas. 200 horas.' },
]

export const SEMESTRES_INFO = {
  0:  { label: 'Nivelación' },
  1:  { label: '1° Año · 1er Semestre' },
  2:  { label: '1° Año · 2do Semestre' },
  3:  { label: '2° Año · 3er Semestre' },
  4:  { label: '2° Año · 4to Semestre' },
  5:  { label: '3° Año · 5to Semestre' },
  6:  { label: '3° Año · 6to Semestre' },
  7:  { label: '4° Año · 7mo Semestre' },
  8:  { label: '4° Año · 8vo Semestre' },
  9:  { label: '5° Año · 9no Semestre' },
  10: { label: '5° Año · 10mo Semestre' },
}
