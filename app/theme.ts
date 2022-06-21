import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Themes } from "~/enums";

const config: ThemeConfig = {
  initialColorMode: Themes.light,
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
