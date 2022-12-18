import { Box, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const DynamicCartSummary = dynamic(
  () =>
    import('../../../containers/CartSummary').then(
      (component) => component.CartSummary
    ),
  {
    ssr: false,
  }
)

const Cart = () => {
  return (
    <Box>
      <Heading as="h1" mb={2}>
        Your Shopping Cart
      </Heading>
      <DynamicCartSummary />
    </Box>
  )
}

export default Cart
