import { InfoIcon } from '@chakra-ui/icons'
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
import Link from 'next/link'

type ShopItemProps = {
  id: string
  title: string
  tags: string[]
  cost: number
  requesition: boolean
  imageUrl: string
  imageAltText: string
  addToCartHandler: () => void
  readMoreLink: string
}

const ShopItem = ({
  id,
  title,
  tags,
  cost,
  requesition,
  imageUrl,
  imageAltText,
  addToCartHandler,
}: ShopItemProps) => {
  const formatter = new Intl.NumberFormat('en-UK')

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        bgColor="black"
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={imageUrl}
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
                    <Badge variant="outline" fontSize="xs">
                      {tag}
                    </Badge>
                  </ListItem>
                ))}
              </Stack>
            </Box>
            {requesition ? (
              <Box display="flex" alignItems="center" gap={2}>
                <InfoIcon color="blue.100" w={5} h={5} />{' '}
                <Text>Requesition Exclusive</Text>
              </Box>
            ) : (
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
            )}
          </Stack>
        </CardBody>
        <CardFooter paddingTop={1}>
          <Stack direction="row">
            <Button
              variant="solid"
              colorScheme="orange"
              size="md"
              onClick={() => addToCartHandler()}
            >
              Add to Cart
            </Button>
            <Link href={`/shop/starships/${id}`} passHref>
              <Button variant="ghost" colorScheme="orange" size="md">
                Read More
              </Button>
            </Link>
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export { ShopItem }
