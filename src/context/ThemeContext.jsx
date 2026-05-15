import { createContext, useContext, useState } from 'react'

// Dark mode: base cálida oscura, no negro frío
// Texto principal #F0E8E8 sobre #0F0A0A → contraste ~14:1 (WCAG AAA)
const DARK = {
  name: 'dark',
  root:        '#0F0A0A',
  header:      '#171010',
  card:        '#1E1313',
  cardHover:   '#251818',
  border:      '#2E1E1E',
  borderActive:'#B82543',
  // texto
  textPrimary:   '#F0E8E8',   // near-white cálido — muy legible
  textSecondary: '#C4A8A8',   // rosa grisáceo
  textMuted:     '#8A6060',
  textDim:       '#5A3A3A',
  textFaint:     '#3A2020',
  // acento
  accent:      '#B82543',
  accentText:  '#F5C0CC',
  // estados nodos
  estados: {
    bloqueada:       { bg: '#1A1010', border: '#2E1A1A', text: '#5A4040', badgeBg: '#170E0E', badgeText: '#5A4040' },
    disponible:      { bg: '#1E1212', border: '#6A3535', text: '#C8A0A0', badgeBg: '#1A1010', badgeText: '#A08080' },
    cursando:        { bg: '#1E1508', border: '#8A5A28', text: '#D4A870', badgeBg: '#1A1206', badgeText: '#B08040' },
    regular:         { bg: '#221010', border: '#A02828', text: '#EAC0C0', badgeBg: '#1E0E0E', badgeText: '#C09090' },
    final_pendiente: { bg: '#2A1010', border: '#C03030', text: '#F5D0D0', badgeBg: '#221010', badgeText: '#D09090' },
    aprobada:        { bg: '#101E10', border: '#3A7A3A', text: '#A8D4A8', badgeBg: '#0E1A0E', badgeText: '#7AAA7A' },
  },
  edges: {
    aprobada:        '#3A7A3A',
    regular:         '#A02828',
    cursando:        '#8A5A28',
    disponible:      '#6A3535',
    bloqueada:       '#2E1E1E',
    final_pendiente: '#C03030',
  },
  diagramaBg:   '#0B0707',
  diagramaDots: '#1E1212',
  minimapBg:    '#171010',
  controlsBg:   '#171010',
}

// Light mode: blanco cálido, acento burdó puro
// Texto #1A0808 sobre #FAFAFA → contraste ~18:1 (WCAG AAA)
const LIGHT = {
  name: 'light',
  root:        '#FAFAFA',
  header:      '#FFFFFF',
  card:        '#FFFFFF',
  cardHover:   '#FDF5F5',
  border:      '#E8D5D5',
  borderActive:'#800020',
  // texto
  textPrimary:   '#1A0808',   // casi negro cálido
  textSecondary: '#5C2020',
  textMuted:     '#9A6060',
  textDim:       '#C4A0A0',
  textFaint:     '#E0CCCC',
  // acento
  accent:      '#800020',
  accentText:  '#800020',
  // estados nodos
  estados: {
    bloqueada:       { bg: '#F5EEEE', border: '#D8C4C4', text: '#A89090', badgeBg: '#EEE5E5', badgeText: '#A89090' },
    disponible:      { bg: '#FFFFFF', border: '#B08080', text: '#5C2020', badgeBg: '#FAF0F0', badgeText: '#7A4040' },
    cursando:        { bg: '#FFFAF4', border: '#C09040', text: '#6A4010', badgeBg: '#FFF4E8', badgeText: '#8A5820' },
    regular:         { bg: '#FFF2F2', border: '#9B2020', text: '#5A1010', badgeBg: '#FFE8E8', badgeText: '#7A2828' },
    final_pendiente: { bg: '#FFEBEB', border: '#B82020', text: '#6A0808', badgeBg: '#FFE0E0', badgeText: '#8A2020' },
    aprobada:        { bg: '#F2FBF2', border: '#3A8A3A', text: '#1A5A1A', badgeBg: '#E8F5E8', badgeText: '#2A7A2A' },
  },
  edges: {
    aprobada:        '#3A8A3A',
    regular:         '#9B2020',
    cursando:        '#C09040',
    disponible:      '#B08080',
    bloqueada:       '#E0CCCC',
    final_pendiente: '#B82020',
  },
  diagramaBg:   '#F5EDED',
  diagramaDots: '#E8D5D5',
  minimapBg:    '#FFFFFF',
  controlsBg:   '#FFFFFF',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('unlp-tema') === 'light' ? LIGHT : DARK
  )

  function toggleTheme() {
    const next = theme.name === 'dark' ? LIGHT : DARK
    localStorage.setItem('unlp-tema', next.name)
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
