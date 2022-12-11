import { Box, Heading, List, ListItem } from '@chakra-ui/react'
import { ShopItem } from 'components/ShopItem'
import { useListStarships } from 'api/useListStarships'
import { StarshipState } from 'api/useListStarships/useListStarships'
import { useShoppingCart } from 'providers/ShoppingCartProvider'

const Shop = () => {
  const { data } = useListStarships()
  const { shoppingCart, updateShoppingCart } = useShoppingCart()

  const addToCartHandler = (starship: StarshipState) => {
    updateShoppingCart([
      ...shoppingCart,
      { name: starship.name, cost: starship.cost, id: starship.id },
    ])
  }

  return (
    <Box>
      <Heading as="h1" mb={5}>
        All Starships
      </Heading>
      <List spacing={5}>
        {data?.map((starship) => (
          <ListItem key={starship.id}>
            <ShopItem
              title={starship.name}
              tags={[starship.type, starship.subtype]}
              cost={starship.cost}
              addToCartHandler={() => addToCartHandler(starship)}
              readMoreLink={''}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Shop
