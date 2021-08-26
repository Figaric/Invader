import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

export const defaultShadow = "-1px 4px 20px -6px rgba(0, 0, 0, 0.75)";

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const colors = {
  darkGray: "#21262D",
  semiDark: "#161B22",
  superDark: "#0D1117"
}

const theme = extendTheme({
  colors,
  fonts,
  breakpoints
})

export default theme;