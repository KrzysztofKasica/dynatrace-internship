import { Input,  Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface avgExchangeRateInterface {
    rate?: number;
    error?: string;
}

export function AvgExchangeRate() {
    const {
        register,
        handleSubmit,
    } = useForm();
    const [result, setResult] = useState<avgExchangeRateInterface>()
    const onSubmit = async (values: any) => {
            const response = await fetch(`http://localhost:4000/avg-exchange-rate/${values.currencyCode}/${values.date}`, {
                credentials: 'include',
                method: 'get',
                headers: {'Content-Type': 'application/json'}});
            const data = await response.json();
            setResult(data);
    }
    return (
        <Box w={1000}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text>1. Average Exchange Rate</Text>
            <VStack>
                <HStack>
                    <Input
                        type="date"
                        placeholder="Date"
                        {...register("date", {
                        required: "Please enter the date",
                        minLength: 10,
                        maxLength: 10
                        })}
                    />
                    <Input
                        type="text"
                        placeholder="Currency code"
                        {...register("currencyCode", {
                        required: "Please enter the Currency code",
                        minLength: 3,
                        maxLength: 3
                        })}
                    />          
                    <Button
                        borderRadius="md"
                        bg="cyan.600"
                        _hover={{ bg: "cyan.200" }}
                        variant="ghost"
                        type="submit"
                    >
                        Submit
                    </Button>
                </HStack>
                {result?.rate ? <Text>Average exchange rate: {result.rate.toString()}</Text> : result?.error ? <Text>Error: {result.error}</Text> : null}
            </VStack>
          </form>
          
        </Box>
      );
}