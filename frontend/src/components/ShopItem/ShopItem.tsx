import {
  Card,
  CardBody,
  Stack,
  Heading,
  List,
  ListItem,
  Badge,
  Button,
  Image,
  Text,
  CardFooter,
  Box,
} from '@chakra-ui/react'

type ShopItemProps = {
  title: string
  tags: string[]
  cost: number
  imageUrl: string
  imageAltText: string
  addToCartHandler: () => void
  readMoreLink: string
}

const ShopItem = ({
  title,
  tags,
  cost,
  imageUrl,
  imageAltText,
  addToCartHandler,
}: ShopItemProps) => {
  const formatter = new Intl.NumberFormat('en-UK')
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          bgColor="black"
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={`http://localhost:1337${imageUrl}`}
          alt={imageAltText}
        />
        <Stack>
          <CardBody paddingBottom={1}>
            <Stack spacing={4}>
              <Box>
                <Heading size="md">{title}</Heading>
                <Stack as={List} direction="row">
                  {tags.map((tag) => (
                    <ListItem key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </ListItem>
                  ))}
                </Stack>
              </Box>
              <Text fontSize="2xl">
                <Text
                  as="span"
                  fontFamily="aurebeshregular"
                  aria-label="Credits: "
                >
                  d
                </Text>
                {formatter.format(cost)}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter paddingTop={1}>
            <Stack direction="row">
              <Button
                variant="solid"
                colorScheme="orange"
                size="sm"
                onClick={() => addToCartHandler()}
              >
                Add to Cart
              </Button>
              <Button variant="ghost" colorScheme="orange" size="sm">
                Read More
              </Button>
            </Stack>
          </CardFooter>
        </Stack>
      </Card>
    </>
  )
}

export { ShopItem }
