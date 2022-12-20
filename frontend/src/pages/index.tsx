import {
  Box,
  Stack,
  Heading,
  Text,
  Center,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'
import Head from 'next/head'
import { LinkCard } from 'components/LinkCard'

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Home | Jurgoran Shipyard</title>
      </Head>
      <Stack spacing={5}>
        <Center>
          <Heading size="xl">Jurgoran Shipyard</Heading>
        </Center>
        <Box
          display="grid"
          gridTemplateRows={{ base: '1fr 1fr', md: '1fr' }}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={5}
        >
          <LinkCard
            title={
              <>
                Dependable Craftsmanship{' '}
                <Text as="span" color="orange.500">
                  You Can Trust
                </Text>
              </>
            }
            content="Our track record of building sturdy starships capable of devastating
          damage means you can concentrate on what matters most out in the
          field."
            linkText="Shop Now"
            href="/shop/starships"
          />
          <Card>
            <CardHeader paddingBottom={2}>
              <Heading size="md">
                {
                  <>
                    Support for{' '}
                    <Text as="span" color="orange.500">
                      When Things Need Fixing
                    </Text>
                  </>
                }
              </Heading>
            </CardHeader>
            <CardBody paddingY={2}>
              <Text>
                After battle, your starship needs to recover just as much as
                your troops. Our modern orbital repair yard is standing ready
                for when you need it.
              </Text>
            </CardBody>
            <CardFooter paddingTop={2}>
              <Text fontWeight="bold">Coming Soon</Text>
            </CardFooter>
          </Card>
        </Box>
      </Stack>
    </>
  )
}

export default Homepage
