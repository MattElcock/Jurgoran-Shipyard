import { Box, Button, ButtonGroup, Stack, Text } from '@chakra-ui/react'

type CartSummaryItemProps = {
  name: string
  costPerItem: number
  quantity: number
  removeFromBasketHandler?: () => void
}

const CartSummaryItem = ({
  name,
  costPerItem,
  quantity,
  removeFromBasketHandler,
}: CartSummaryItemProps) => {
  const formatter = new Intl.NumberFormat('en-UK')
  const totalCost = costPerItem * quantity
  return (
    <Box pt="4">
      <Stack spacing={2}>
        <Stack spacing="0.5">
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="medium">{name}</Text>
            <Text fontWeight="medium">
              <Text
                as="span"
                fontFamily="aurebeshregular"
                aria-label={`${totalCost} credits.`}
              >
                d
              </Text>
              {formatter.format(totalCost)}
            </Text>
          </Box>

          <Text color="gray.400" fontSize="sm">
            Cost per item:{' '}
            <Text
              as="span"
              fontFamily="aurebeshregular"
              aria-label={`${costPerItem} credits.`}
            >
              d
            </Text>
            {formatter.format(costPerItem)}
          </Text>
          <Text color="gray.400" fontSize="sm">
            {`Quantity: ${quantity}`}
          </Text>
        </Stack>
        {removeFromBasketHandler && (
          <ButtonGroup variant="link" colorScheme="white" size="xs">
            <Button onClick={removeFromBasketHandler}>
              Remove All From Basket
            </Button>
          </ButtonGroup>
        )}
      </Stack>
    </Box>
  )
}

export { CartSummaryItem }
