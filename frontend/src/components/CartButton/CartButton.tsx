import { IconButton, Icon, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useShoppingCart } from 'providers/ShoppingCartProvider'
import { MdShoppingCart } from 'react-icons/md'

const CartButton = () => {
  const { shoppingCart } = useShoppingCart()

  return (
    <Link href="/shop/cart" passHref>
      <Box position="relative" display="flex">
        <IconButton
          icon={<Icon as={MdShoppingCart} w={7} h={7} />}
          aria-label={`There are ${shoppingCart.length} items in your cart`}
          variant="link"
          color="white"
          alignContent="center"
        />
        {shoppingCart.length > 0 && (
          <Box
            position="absolute"
            top={5}
            left={5}
            bg="orange.500"
            w={5}
            h={5}
            borderRadius={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xs" fontWeight={600}>
              {shoppingCart.length}
            </Text>
          </Box>
        )}
      </Box>
    </Link>
  )
}

export { CartButton }
