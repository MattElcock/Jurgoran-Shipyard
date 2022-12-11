import {
  Card,
  CardBody,
  Stack,
  Heading,
  List,
  ListItem,
  Badge,
  Divider,
  CardFooter,
  Button,
  Image,
  Box,
  Text,
} from '@chakra-ui/react'

type ShopItemProps = {
  title: string
  tags: string[]
  cost: number
  addToCartHandler: () => void
  readMoreLink: string
}

const ShopItem = ({ title, tags, cost, addToCartHandler }: ShopItemProps) => {
  const formatter = new Intl.NumberFormat('en-UK')
  return (
    <Card>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Box>
            <Heading size="md" as="h3">
              {title}
            </Heading>
            <Stack as={List} direction="row">
              {tags.map((tag) => (
                <ListItem key={tag}>
                  <Badge variant="outline">{tag}</Badge>
                </ListItem>
              ))}
            </Stack>
          </Box>
          <Text fontSize="2xl">
            <Text as="span" fontFamily="aurebeshregular" aria-label="Credits: ">
              d
            </Text>
            {formatter.format(cost)}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
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
    </Card>
  )
}

export { ShopItem }
