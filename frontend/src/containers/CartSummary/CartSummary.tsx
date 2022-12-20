import {
  Stack,
  List,
  ListItem,
  Divider,
  Card,
  CardBody,
  Heading,
  Button,
  Icon,
  Box,
  Text,
} from '@chakra-ui/react'
import { CartSummaryItem } from 'components/CartSummaryItem'
import { remove } from 'lodash'
import Link from 'next/link'
import {
  useShoppingCart,
  QuantifiedCartItem,
} from 'providers/ShoppingCartProvider'
import { GiFactory } from 'react-icons/gi'

const CartSummary = () => {
  const {
    shoppingCart,
    quantifiedShoppingCart,
    totalCost,
    updateShoppingCart,
  } = useShoppingCart()
  const formatter = new Intl.NumberFormat('en-UK')

  const removeFromBasketHandler = (cartItem: QuantifiedCartItem) => {
    const newShoppingCart = [...shoppingCart]
    remove(newShoppingCart, (item) => item.name === cartItem.name)
    updateShoppingCart(newShoppingCart)
  }

  if (shoppingCart.length === 0) {
    return (
      <Card>
        <CardBody>
          <Stack spacing={3} alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <Icon as={GiFactory} w={20} h={20} />
              <Text fontWeight="medium">Your cart is empty.</Text>
            </Box>
            <Link href="/shop/starships" passHref>
              <Button
                width={{ base: 'full', md: 'fit-content' }}
                colorScheme="orange"
              >
                Shop Now
              </Button>
            </Link>
          </Stack>
        </CardBody>
      </Card>
    )
  }
  return (
    <Box
      display="grid"
      gridTemplateAreas={{ base: "'cart' 'summary'", md: "'cart summary'" }}
      gap={{ base: 5, md: 20 }}
    >
      <Box gridArea="cart">
        <List>
          {quantifiedShoppingCart.map((cartItem, i) => (
            <ListItem key={cartItem.name} mt={i > 0 ? 4 : 0}>
              {i > 0 && <Divider />}
              <CartSummaryItem
                name={cartItem.name}
                requisition={cartItem.requisition}
                costPerItem={cartItem.cost}
                quantity={cartItem.quantity}
                removeFromBasketHandler={() =>
                  removeFromBasketHandler(cartItem)
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box gridArea="summary">
        <Card>
          <CardBody>
            <Stack spacing={3}>
              <Heading as="h3" size="md">
                Order Summary
              </Heading>
              <Stack spacing={0.5}>
                <Text>Number of Items: {shoppingCart.length}</Text>
                <Text>
                  Total Cost:{' '}
                  <Text
                    as="span"
                    fontFamily="aurebeshregular"
                    aria-label={`${totalCost} credits.`}
                  >
                    d
                  </Text>
                  {formatter.format(totalCost)}
                </Text>
              </Stack>
              <Link href="/shop/checkout" passHref>
                <Button width="100%" colorScheme="orange">
                  Checkout
                </Button>
              </Link>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}

export { CartSummary }
