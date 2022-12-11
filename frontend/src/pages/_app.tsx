import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { AppLayout } from 'layouts/AppLayout'
import { ShoppingCartProvider } from 'providers/ShoppingCartProvider/ShoppingCartProvider'
import theme from 'theme'
import 'styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ShoppingCartProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ShoppingCartProvider>
    </ChakraProvider>
  )
}

export default MyApp
