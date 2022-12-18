import {
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Box,
  Button,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type Inputs = {
  name: string;
  discordID: string;
  powerbase: string;
  role: string;
  liabilityWaiver: boolean;
};

type CustomerDetailsProps = {
  data: Inputs;
  handleNext: (data: Inputs) => void;
};

const useSchema = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    discordID: yup
      .string()
      .required("Required")
      .matches(/^.{3,32}#[0-9]{4}$/, "Invalid format"),
    powerbase: yup.string().required("Required"),
    role: yup.string().required("Required"),
    liabilityWaiver: yup.bool().isTrue("Required"),
  });

  return schema;
};

const CustomerDetails = ({ handleNext, data }: CustomerDetailsProps) => {
  const schema = useSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { ...data },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => handleNext(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel>What is your name?</FormLabel>
          <Input {...register("name")} />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
          <FormHelperText>
            Please include your primary title, if you have one.
          </FormHelperText>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.discordID)}>
          <FormLabel>
            Holofrequency{" "}
            <Text fontWeight="normal" fontSize="sm" color="GrayText" as="span">
              (a.k.a. your Discord ID)
            </Text>
          </FormLabel>
          <Input {...register("discordID")} />
          {errors.discordID && (
            <FormErrorMessage>{errors.discordID.message}</FormErrorMessage>
          )}
          <FormHelperText>
            It will look something like this: SarahJaneSmith#0000
          </FormHelperText>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.powerbase)}>
          <FormLabel>
            What powerbase or organisation do you belong to?
          </FormLabel>
          <Input {...register("powerbase")} />
          {errors.powerbase && (
            <FormErrorMessage>{errors.powerbase.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.role)}>
          <FormLabel>
            What role do you fill in that powerbase or organisation?
          </FormLabel>
          <Input {...register("role")} />
          {errors.role && (
            <FormErrorMessage>{errors.role.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.liabilityWaiver)}>
          <Box display="flex" gap={5}>
            <Checkbox size="lg" {...register("liabilityWaiver")} />
            <FormLabel fontSize="sm" fontWeight="normal">
              By ticking this box, I confirm I am authorised to make this
              transaction. I take full responsibility should it be learned this
              is not the case.
            </FormLabel>
          </Box>
          {errors.liabilityWaiver && (
            <FormErrorMessage>
              {errors.liabilityWaiver.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button variant="solid" colorScheme="orange" type="submit">
          Next
        </Button>
      </Stack>
    </form>
  );
};

export { CustomerDetails };
