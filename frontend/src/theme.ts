import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    CardBody: {
      variants: {
        default: {
          padding: "1px",
        },
      },
    },
  },
});

export default theme;
