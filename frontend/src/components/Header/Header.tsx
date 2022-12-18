import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicCartButton = dynamic(
  () => import('../CartButton').then((component) => component.CartButton),
  {
    ssr: false,
  }
)

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Link href="/" passHref>
        <Image
          src="/logo_simple.png"
          width={50}
          height={50}
          alt="Jurgoran Shipyard"
        />
      </Link>

      <Stack direction="row" gap={2}>
        <DynamicCartButton />
      </Stack>
    </Box>
  )
}

export { Header }
