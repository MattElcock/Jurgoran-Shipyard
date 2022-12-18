import { Heading, Stack, Box } from '@chakra-ui/react'
import { useState } from 'react'
import {
  CustomerDetails,
  Inputs as CustomerDetailsInputs,
} from 'containers/OrderSteps/CustomerDetails'
import {
  OrderDetails,
  Inputs as OrderDetailsInputs,
} from 'containers/OrderSteps/OrderDetails'
import { CollapsibleAlert } from 'components/CollapsibleAlert'
import { Summary } from 'containers/OrderSteps/Summary'
import { useCreateOrder } from 'api/useCreateOrder'
import { useShoppingCart } from 'providers/ShoppingCartProvider'
import { OrderInput } from 'api/useCreateOrder/useCreateOrder'
import { Success } from 'containers/OrderSteps/Success'

const Checkout = () => {
  const { execute } = useCreateOrder()
  const { quantifiedShoppingCart, totalCost, updateShoppingCart } =
    useShoppingCart()
  const [activeStep, setActiveStep] = useState<number>(1)
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsInputs>(
    {} as CustomerDetailsInputs
  )
  const [orderDetails, setOrderDetails] = useState<OrderDetailsInputs>(
    {} as OrderDetailsInputs
  )

  const handleSubmit = async () => {
    const order: OrderInput = {
      items: quantifiedShoppingCart.map((cartItem) => ({
        item: cartItem.id,
        quantity: cartItem.quantity,
      })),
      customerName: customerDetails.name,
      customerDiscordID: customerDetails.discordID,
      powerbase: customerDetails.powerbase,
      role: customerDetails.role,
      totalCost,
      deliveryOrCollection: orderDetails.collectionOrDelivery,
      deliveryLocation: orderDetails.deliveryLocation,
      notes: orderDetails.notes,
    }

    execute(order)
      .then(() => {
        updateShoppingCart([])
        setActiveStep(4)
      })
      .catch((e) => console.log(e))
  }

  return (
    <Stack spacing={5}>
      <Box>
        <Heading size="md" color="GrayText">
          Checkout
        </Heading>
        {activeStep === 1 && <Heading>Customer Details</Heading>}
        {activeStep === 2 && <Heading>Order Details</Heading>}
        {activeStep === 3 && <Heading>Order Summary</Heading>}
        {activeStep === 4 && <Heading>Order received</Heading>}
      </Box>
      <CollapsibleAlert
        title="Out of Character Information"
        description='Please fill in this form from the perspective of your character, not
            yourself. The only exception is when we ask for your
            "holofrequency", by which we really mean your Discord ID.'
      />
      {activeStep === 1 && (
        <CustomerDetails
          data={customerDetails}
          handleNext={(data) => {
            setActiveStep(2)
            setCustomerDetails(data)
          }}
        />
      )}
      {activeStep === 2 && (
        <OrderDetails
          data={orderDetails}
          handleBack={() => setActiveStep(1)}
          handleNext={(data) => {
            setActiveStep(3)
            setOrderDetails(data)
          }}
        />
      )}
      {activeStep === 3 && (
        <Summary
          customerDetails={customerDetails}
          orderDetails={orderDetails}
          handleBack={() => setActiveStep(2)}
          handleSubmit={handleSubmit}
        />
      )}
      {activeStep === 4 && <Success />}
    </Stack>
  )
}

export default Checkout
