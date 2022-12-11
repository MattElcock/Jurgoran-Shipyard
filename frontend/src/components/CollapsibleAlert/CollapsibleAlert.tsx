import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  IconButton,
  AlertDescription,
} from '@chakra-ui/react'
import { ReactNode, useState } from 'react'

type CollapsibleAlertProps = {
  title: string
  description: ReactNode
}

const CollapsibleAlert = ({ title, description }: CollapsibleAlertProps) => {
  const [guidanceExpanded, setGuidanceExpanded] = useState<boolean>(false)

  return (
    <Alert
      status="info"
      display="grid"
      gridTemplateColumns="auto 1fr auto"
      gridTemplateRows="auto 1fr"
      rowGap={guidanceExpanded ? 1 : 0}
    >
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <IconButton
        justifySelf="right"
        aria-label="Expand"
        icon={
          guidanceExpanded ? (
            <ChevronUpIcon w={7} h={7} />
          ) : (
            <ChevronDownIcon w={7} h={7} />
          )
        }
        variant="link"
        onClick={() => setGuidanceExpanded(!guidanceExpanded)}
      />
      {guidanceExpanded && (
        <AlertDescription gridRow="2" gridColumn="1/4">
          {description}
        </AlertDescription>
      )}
    </Alert>
  )
}

export { CollapsibleAlert }
