import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Center,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { AvgExchangeRate } from "./components/AvgExchangeRate"
import { MaxMinValue } from "./components/MaxMinValue"
import { BuyAskDiff } from "./components/BuyAskDiff"


export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Center mt="-1000">
          <VStack spacing={8}>
              <AvgExchangeRate />
              <MaxMinValue />
              <BuyAskDiff />
          </VStack>
        </Center>
      </Grid>
    </Box>
  </ChakraProvider>
)
