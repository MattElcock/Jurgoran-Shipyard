import { cardAnatomy } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardBaseStyle = definePartsStyle({
  container: { backgroundColor: '#1c1c1c' },
})

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      ['chakra-body-bg']: {
        _dark: '#111',
      },
    },
  },
  components: {
    Card: defineMultiStyleConfig({ baseStyle: cardBaseStyle }),
    CardBody: {
      variants: {
        default: {
          padding: '1px',
        },
      },
    },
    Button: {
      variants: {
        solid: {
          width: { base: 'full', md: 'fit-content' },
        },
        outline: {
          width: { base: 'full', md: 'fit-content' },
        },
      },
    },
  },
})

export default theme
