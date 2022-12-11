import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { remove } from 'lodash'
import { CartSummaryItem } from 'components/CartSummaryItem'
import {
  useShoppingCart,
  QuantifiedCartItem,
} from 'providers/ShoppingCartProvider'
import { GiFactory } from 'react-icons/gi'
import Link from 'next/link'

const Cart = () => {
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

  return (
    <Box>
      <Heading as="h1" mb={2}>
        Your Shopping Cart
      </Heading>
      <Stack spacing={6}>
        <List>
          {quantifiedShoppingCart.map((cartItem, i) => (
            <ListItem key={cartItem.name} mt={i > 0 ? 4 : 0}>
              {i > 0 && <Divider />}
              <CartSummaryItem
                name={cartItem.name}
                costPerItem={cartItem.cost}
                quantity={cartItem.quantity}
                removeFromBasketHandler={() =>
                  removeFromBasketHandler(cartItem)
                }
              />
            </ListItem>
          ))}
        </List>
        {shoppingCart.length > 0 ? (
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
        ) : (
          <Card>
            <CardBody>
              <Stack spacing={3}>
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
                  <Button width="full" colorScheme="orange">
                    Shop Now
                  </Button>
                </Link>
              </Stack>
            </CardBody>
          </Card>
        )}
      </Stack>
    </Box>
  )
}

export default Cart
