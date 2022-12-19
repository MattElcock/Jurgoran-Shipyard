import { Stack, Heading, RadioGroup, Radio, Button } from '@chakra-ui/react'

type StarshipFiltersProps = {
  typeFilter: string
  handleTypeFilterChange: (type: string) => void
  subtypeFilter: string
  handleSubtypeFilterChange: (subtype: string) => void
  handleShowOptions?: () => void
}
import { camelCase } from 'lodash'

const StarshipFilters = ({
  typeFilter,
  handleTypeFilterChange,
  subtypeFilter,
  handleSubtypeFilterChange,
  handleShowOptions,
}: StarshipFiltersProps) => {
  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Heading size="sm">Type</Heading>
        <RadioGroup
          defaultValue=""
          value={typeFilter}
          onChange={(type) => handleTypeFilterChange(type)}
        >
          <Stack>
            <Radio value="">All</Radio>
            <Radio value="dreadnought">Dreadnoughts</Radio>
            <Radio value="destroyer">Destroyers</Radio>
            <Radio value="support">Support</Radio>
            <Radio value="starfighter">Starfighters</Radio>
          </Stack>
        </RadioGroup>
      </Stack>

      <Stack spacing={3}>
        <Heading size="sm">Subtype</Heading>
        <RadioGroup
          defaultValue=""
          value={subtypeFilter}
          onChange={(subtype) => handleSubtypeFilterChange(subtype)}
        >
          <Stack>
            <Radio value="">All</Radio>
            {typeFilter === 'support' &&
              ['Transport', 'Strategic'].map((subtype) => (
                <Radio key={subtype} value={camelCase(subtype)}>
                  {subtype}
                </Radio>
              ))}
            {typeFilter === 'starfighter' &&
              [
                'Bomber',
                'Gunship',
                'Scout',
                'Strike Fighter',
                'Interceptor',
              ].map((subtype) => (
                <Radio key={subtype} value={camelCase(subtype)}>
                  {subtype}
                </Radio>
              ))}
          </Stack>
        </RadioGroup>
      </Stack>

      {handleShowOptions && (
        <Button
          width="full"
          colorScheme="orange"
          onClick={() => handleShowOptions()}
        >
          Show Results
        </Button>
      )}
    </Stack>
  )
}

export { StarshipFilters }
