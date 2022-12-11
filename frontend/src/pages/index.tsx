import { Box, Stack, Heading, Text, Center } from "@chakra-ui/react";
import Head from "next/head";
import { LinkCard } from "components/LinkCard";

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Home | Jurgoran Shipyard</title>
      </Head>
      <Box>
        <Stack spacing={5}>
          <Center>
            <Heading size="xl">Jurgoran Shipyard</Heading>
          </Center>

          <LinkCard
            title={
              <>
                Dependable Craftsmanship{" "}
                <Text as="span" color="orange.500">
                  You Can Trust
                </Text>
              </>
            }
            content="Our track record of building sturdy starships capable of devastating
          damage means you can concentrate on what matters most out in the
          field."
            linkText="Shop Now"
            href="/shop/starships"
          />
          <LinkCard
            title={
              <>
                Support for{" "}
                <Text as="span" color="orange.500">
                  When Things Need Fixing
                </Text>
              </>
            }
            content="After battle, your starship needs to recover just as much as your troops. Our modern orbital repair yard is standing ready for when you need it."
            linkText="Book a Repair"
            href="/repairs"
          />
        </Stack>
      </Box>
    </>
  );
};

export default Homepage;
