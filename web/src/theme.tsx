import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

export const defaultShadow = "-1px 4px 20px -6px rgba(0, 0, 0, 0.75)";
export const shallowShadow = "-1px 4px 20px -6px rgba(0, 0, 0, 0.4)";

const fonts = { mono: `'Menlo', monospace` }

const globalStyles = {
  body: {
    bg: "superDark",
    color: "gray.300",
  },
};

const defaultHeadingStyle = {
  baseStyle: {
    fontWeight: 350
  }
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const colors = {
  darkGray: "#21262D",
  semiDark: "#161B22",
  superDark: "#0D1117",
  default: {
    500: "#0D1117",
    600: "#21262D"
  },
  delete: {
    500: "#0D1117",
    600: "#E53E3E"
  }
}

const theme = extendTheme({
  components: {
    Heading: defaultHeadingStyle
  },
  styles: {
    global: globalStyles
  },
  colors,
  fonts,
  breakpoints
});

export default theme;