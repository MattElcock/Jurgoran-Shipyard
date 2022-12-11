import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Footer } from "components/Footer";
import { Header } from "components/Header";

type AppLayoutProps = {
  children: ReactNode;
};

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
      <Box as="header" gridArea="header" bg="gray.900" paddingY={3}>
        <Container>
          <Header />
        </Container>
      </Box>
      <Box as="main" gridArea="main">
        <Container>{children}</Container>
      </Box>
      <Box as="footer" gridArea="footer" paddingY={5}>
        <Container>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

export { AppLayout };
