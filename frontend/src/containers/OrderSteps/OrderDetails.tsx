import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  FormHelperText,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

export type Inputs = {
  collectionOrDelivery: string
  deliveryLocation?: string
  notes?: string
}

type OrderDetailsProps = {
  data: Inputs
  handleNext: (data: Inputs) => void
  handleBack: () => void
}

const useSchema = () => {
  const schema = yup.object().shape({
    collectionOrDelivery: yup.string().nullable().required('Required'),
    deliveryLocation: yup.string().when('collectionOrDelivery', {
      is: 'Delivery',
      then: yup.string().required('Required'),
    }),
    notes: yup.string(),
  })

  return schema
}

const OrderDetails = ({ handleNext, handleBack, data }: OrderDetailsProps) => {
  const schema = useSchema()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { ...data },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => handleNext(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl
          isInvalid={Boolean(errors.collectionOrDelivery)}
          width={{ base: '100%', md: '25rem' }}
        >
          <FormLabel>
            Would you like to order for collection or delivery?
          </FormLabel>
          <RadioGroup>
            <Stack>
              <Radio value="Collection" {...register('collectionOrDelivery')}>
                Collection
              </Radio>
              <Radio value="Delivery" {...register('collectionOrDelivery')}>
                Delivery
              </Radio>
            </Stack>
          </RadioGroup>
          {errors.collectionOrDelivery && (
            <FormErrorMessage>
              {errors.collectionOrDelivery?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        {watch('collectionOrDelivery') === 'Delivery' && (
          <FormControl
            isInvalid={Boolean(errors.deliveryLocation)}
            width={{ base: '100%', md: '25rem' }}
          >
            <FormLabel>Where would you like your products delivered?</FormLabel>
            <Input {...register('deliveryLocation')} />
            {errors.deliveryLocation && (
              <FormErrorMessage>
                {errors.deliveryLocation.message}
              </FormErrorMessage>
            )}
          </FormControl>
        )}
        <FormControl width={{ base: '100%', md: '25rem' }}>
          <FormLabel>Notes</FormLabel>
          <Textarea {...register('notes')} />
          <FormHelperText>
            You can use this space to request any modifications or let us know
            about anything related to your order.{' '}
          </FormHelperText>
        </FormControl>
        <Stack spacing={3} direction={{ base: 'column', md: 'row' }}>
          <Button variant="solid" colorScheme="orange" type="submit">
            Next
          </Button>
          <Button variant="outline" colorScheme="orange" onClick={handleBack}>
            Back to Customer Details
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { OrderDetails }
