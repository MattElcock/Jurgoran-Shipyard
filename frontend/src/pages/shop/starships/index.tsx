import {
  Button,
  Heading,
  List,
  ListItem,
  Stack,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Select,
  Box,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import { ShopItem } from 'components/ShopItem'
import { useListStarships } from 'api/useListStarships'
import { StarshipState } from 'api/useListStarships/useListStarships'
import { useShoppingCart } from 'providers/ShoppingCartProvider'
import { MdFilterList } from 'react-icons/md'
import { useState } from 'react'
import Head from 'next/head'
import { StarshipFilters } from 'components/StarshipFilters'

const Shop = () => {
  const [typeFilter, setTypeFilter] = useState('')
  const [subtypeFilter, setSubtypeFilter] = useState('')
  const [sort, setSort] = useState('asc')
  const { data } = useListStarships(typeFilter, subtypeFilter, sort)
  const { shoppingCart, updateShoppingCart } = useShoppingCart()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addToCartHandler = (starship: StarshipState) => {
    updateShoppingCart([
      ...shoppingCart,
      {
        name: starship.name,
        cost: starship.cost,
        id: starship.id,
        requisition: starship.requisition,
      },
    ])
  }

  const handleFiltersClick = () => {
    onOpen()
  }

  const handleTypeFilterChange = (type: string) => {
    setTypeFilter(type)
    setSubtypeFilter('')
  }

  const handleSubtypeFilter = (subtype: string) => {
    setSubtypeFilter(subtype)
  }

  const handleShowOptions = () => {
    onClose()
  }

  const handleSortChange = (sort: string) => {
    setSort(sort)
  }

  return (
    <>
      <Head>
        <title>Starships | Jurgoran Shipyard</title>
      </Head>
      <Box
        display="grid"
        gap={5}
        rowGap={{ lg: 7 }}
        gridTemplateAreas={{
          base: "'heading' 'filters' 'products'",
          md: "'heading heading' 'filters products'",
        }}
        gridTemplateRows={{ base: '1fr', md: 'auto 1fr' }}
        gridTemplateColumns={{ base: '1fr', md: '1fr 3fr' }}
      >
        <Box gridArea="heading">
          <Heading as="h1">All Starships</Heading>
        </Box>
        <Box gridArea="filters">
          <Box display={{ base: 'flex', md: 'none' }}>
            <Button
              borderColor="gray.700"
              rightIcon={<Icon as={MdFilterList} w={5} h={5} />}
              width="50%"
              justifyContent="space-between"
              variant="outline"
              fontWeight="normal"
              borderRightRadius={0}
              onClick={() => handleFiltersClick()}
            >
              Filters
            </Button>
            <Select
              width="50%"
              borderLeft="0"
              borderLeftRadius={0}
              borderColor="gray.700"
              value={sort}
              onChange={(sort) => handleSortChange(sort.target.value)}
            >
              <option value="asc">Price: low - high</option>
              <option value="desc">Price: high - low</option>
            </Select>
          </Box>
          <Box display={{ base: 'none', md: 'block' }}>
            <Stack spacing={7}>
              <Stack spacing={3}>
                <Heading size="md">Sort</Heading>
                <RadioGroup
                  defaultValue="asc"
                  value={sort}
                  onChange={(value) => handleSortChange(value)}
                >
                  <Stack>
                    <Radio value="asc">Price: low - high</Radio>
                    <Radio value="desc">Price: high - low</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
              <Stack spacing={3}>
                <Heading size="md">Filters</Heading>
                <StarshipFilters
                  typeFilter={typeFilter}
                  handleTypeFilterChange={handleTypeFilterChange}
                  subtypeFilter={subtypeFilter}
                  handleSubtypeFilterChange={handleSubtypeFilter}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box gridArea="products">
          <List spacing={5}>
            {data?.map((starship) => (
              <ListItem key={starship.id}>
                <ShopItem
                  id={starship.id}
                  title={starship.name}
                  tags={[starship.type, starship.subtype]}
                  cost={starship.cost}
                  imageUrl={starship.imageUrl}
                  imageAltText={starship.imageAlt}
                  requisition={starship.requisition}
                  addToCartHandler={() => addToCartHandler(starship)}
                  readMoreLink={''}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent
          data-theme="dark"
          bg="chakra-body-bg"
          color="chakra-body-text"
        >
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
            <StarshipFilters
              typeFilter={typeFilter}
              handleTypeFilterChange={handleTypeFilterChange}
              subtypeFilter={subtypeFilter}
              handleSubtypeFilterChange={handleSubtypeFilter}
              handleShowOptions={handleShowOptions}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Shop
