import { Box, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { MdShoppingCart } from 'react-icons/md'
import { useShoppingCart } from 'providers/ShoppingCartProvider'
import Link from 'next/link'

const Header = () => {
  const { shoppingCart } = useShoppingCart()

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Link href="/" passHref>
        <Image
          src="/logo_simple.png"
          width={50}
          height={50}
          alt="Jurgoran Shipyard"
        />
      </Link>

      <Stack direction="row" gap={2}>
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
      </Stack>
    </Box>
  )
}

export { Header }
