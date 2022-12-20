import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  components: {
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
