import { Box, Container } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box
      data-theme="dark"
      bg="chakra-body-bg"
      color="chakra-body-text"
      minHeight="100vh"
      height="100%"
      display="grid"
      gridTemplateAreas="'header' 'main' 'footer'"
      gridTemplateRows="auto 1fr auto"
      gap={5}
    >
      <Box as="header" gridArea="header" bg="black" paddingY={3}>
        <Container maxW={{ lg: 'container.lg' }}>
          <Header />
        </Container>
      </Box>
      <Box as="main" gridArea="main">
        <Container maxW={{ lg: 'container.lg' }}>{children}</Container>
      </Box>
      <Box as="footer" gridArea="footer" paddingY={5}>
        <Container maxW={{ lg: 'container.lg' }}>
          <Footer />
        </Container>
      </Box>
    </Box>
  )
}

export { AppLayout }
