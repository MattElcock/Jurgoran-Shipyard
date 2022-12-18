import {
  Heading,
  Text,
  Stack,
  Box,
  ListItem,
  UnorderedList,
  Button,
} from '@chakra-ui/react'
import { useShoppingCart } from 'providers/ShoppingCartProvider'
import { Inputs as CustomerDetails } from './CustomerDetails'
import { Inputs as OrderDetails } from './OrderDetails'

type SummaryProps = {
  customerDetails: CustomerDetails
  orderDetails: OrderDetails
  handleBack: () => void
  handleSubmit: () => void
}

const Summary = ({
  customerDetails,
  orderDetails,
  handleBack,
  handleSubmit,
}: SummaryProps) => {
  const { quantifiedShoppingCart, totalCost } = useShoppingCart()
  const formatter = new Intl.NumberFormat('en-UK')

  return (
    <Box>
      <Stack spacing={4}>
        <Box>
          <Heading size="md" mb={2}>
            Customer Details
          </Heading>
          <Stack spacing={2}>
            <Text fontWeight="bold">
              Name:{' '}
              <Text fontWeight="normal" as="span" display="block">
                {customerDetails.name}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Holofrequency:{' '}
              <Text fontWeight="normal" as="span" display="block">
                {customerDetails.discordID}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Powerbase:{' '}
              <Text fontWeight="normal" as="span" display="block">
                {customerDetails.powerbase}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Role:{' '}
              <Text fontWeight="normal" as="span" display="block">
                {customerDetails.role}
              </Text>
            </Text>
          </Stack>
        </Box>
        <Box>
          <Heading size="md" mb={2}>
            Order Details
          </Heading>
          <Stack spacing={2}>
            <Text fontWeight="bold">
              Total Cost:{' '}
              <Box>
                <Text
                  as="span"
                  fontWeight="normal"
                  fontFamily="aurebeshregular"
                  aria-label={`${totalCost} credits.`}
                >
                  d
                </Text>
                <Text fontWeight="normal" as="span">
                  {formatter.format(totalCost)}
                </Text>
              </Box>
            </Text>
            <Text fontWeight="bold">Items:</Text>
            <UnorderedList paddingLeft={5}>
              {quantifiedShoppingCart.map((item) => (
                <ListItem key={item.name}>
                  <Text>
                    {item.name} x {item.quantity}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
            <Text fontWeight="bold">
              Delivery or Collection:{' '}
              <Text fontWeight="normal" as="span" display="block">
                {orderDetails.collectionOrDelivery}
              </Text>
            </Text>
            {orderDetails.collectionOrDelivery === 'Collection' && (
              <Text fontWeight="bold">
                Collecting from:{' '}
                <Text fontWeight="normal" as="span" display="block">
                  Jurgoran Shipyard
                </Text>
              </Text>
            )}
            {orderDetails.collectionOrDelivery === 'Delivery' && (
              <Text fontWeight="bold">
                Delivery location:{' '}
                <Text fontWeight="normal" as="span" display="block">
                  {orderDetails.deliveryLocation}
                </Text>
              </Text>
            )}
            {orderDetails.notes && (
              <Text fontWeight="bold">
                Notes:{' '}
                <Text fontWeight="normal" as="span" display="block">
                  {orderDetails.notes}
                </Text>
              </Text>
            )}
          </Stack>
        </Box>

        <Button variant="solid" colorScheme="orange" onClick={handleSubmit}>
          Place Order
        </Button>
        <Button variant="outline" colorScheme="orange" onClick={handleBack}>
          Back
        </Button>
      </Stack>
    </Box>
  )
}

export { Summary }
