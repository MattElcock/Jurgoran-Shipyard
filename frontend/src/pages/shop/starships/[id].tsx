import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useGetStarship } from 'api/useGetStarship'
import { StarshipState } from 'api/useListStarships/useListStarships'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useShoppingCart } from 'providers/ShoppingCartProvider'
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import Head from 'next/head'

const StarshipDetailPage = () => {
  const router = useRouter()
  const starshipId = router.query.id as string
  const { isLoading, data } = useGetStarship(starshipId)
  const { shoppingCart, updateShoppingCart } = useShoppingCart()
  const formatter = new Intl.NumberFormat('en-UK')

  if (isLoading) {
    return <p>Loading</p>
  }

  if (!data) {
    return <p>Error</p>
  }

  const addToCartHandler = (starship: StarshipState) => {
    updateShoppingCart([
      ...shoppingCart,
      {
        name: starship.name,
        cost: starship.cost,
        id: starship.id,
        requisition: starship.requisition,
      },
    ])
  }

  const armament = data.armament.map((item) => ({
    quantity: item.quantity,
    name: item.weapon.data.attributes.name,
  }))

  return (
    <>
      <Head>
        <title>{data.name} | Jurgoran Shipyard</title>
      </Head>
      <Box
        display="grid"
        gridTemplateAreas={{
          base: "'image' 'heading' 'description' 'actions'",
          md: "'heading image' 'description image' 'actions image'",
        }}
        gap={{ base: 5 }}
      >
        <Box gridArea="image">
          <Image
            bgColor="black"
            objectFit="cover"
            width="100%"
            src={data.imageUrl}
            alt={data.imageAlt}
          />
        </Box>
        <Box gridArea="heading">
          <Stack spacing={{ base: 2 }}>
            <Heading>{data.name}</Heading>
            <Stack as={List} direction="row">
              <ListItem>
                <Badge variant="outline">{data.type}</Badge>
              </ListItem>
              <ListItem>
                <Badge variant="outline">{data.subtype}</Badge>
              </ListItem>
            </Stack>

            {data.requisition ? (
              <Alert>
                <AlertIcon alignSelf="start" />
                <Box>
                  <AlertTitle>Requisition Exclusive</AlertTitle>
                  <AlertDescription>
                    This product cannot be bought. After placing your order, you
                    will need to present a requisition order from Imperial
                    Command.
                  </AlertDescription>
                </Box>
              </Alert>
            ) : (
              <Text fontSize="2xl">
                <Text
                  as="span"
                  fontFamily="aurebeshregular"
                  aria-label="Credits: "
                >
                  d
                </Text>
                {formatter.format(data.cost)}
              </Text>
            )}
          </Stack>
        </Box>
        <Box gridArea="description">
          <Stack>
            <ReactMarkdown components={ChakraUIRenderer()}>
              {data.description}
            </ReactMarkdown>
            <Heading size="lg">Armament</Heading>
            <UnorderedList paddingLeft={5}>
              {armament.map((weapon) => (
                <ListItem key={weapon.name}>
                  <Text>{`${weapon.quantity} x ${weapon.name}`}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Stack>
        </Box>
        <Box gridArea="actions">
          <Stack direction="row">
            <Button
              variant="solid"
              colorScheme="orange"
              size="md"
              onClick={() => addToCartHandler({ id: starshipId, ...data })}
            >
              Add to Cart
            </Button>
            <Box display={{ base: 'block', md: 'none' }}>
              <Link href={`/shop/starships`} passHref>
                <Button variant="ghost" colorScheme="orange" size="md">
                  Back to Shop
                </Button>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default StarshipDetailPage
