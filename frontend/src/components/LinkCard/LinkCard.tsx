import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

type LinkCardProps = {
  title: string | ReactNode;
  content: string;
  linkText: string;
  href: string;
};

const LinkCard = ({ title, content, linkText, href }: LinkCardProps) => {
  return (
    <Card>
      <CardHeader paddingBottom={2}>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody paddingY={2}>
        <Text>{content}</Text>
      </CardBody>
      <CardFooter paddingTop={2}>
        <Link href={href} passHref>
          <Button variant="solid" colorScheme="orange">
            {linkText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { LinkCard };
