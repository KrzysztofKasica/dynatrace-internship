import { Input,  Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface maxMinValueInterface {
    max?: number;
    min?: number;
    error?: string;
}

export function MaxMinValue() {
    const {
        register,
        handleSubmit,
    } = useForm();
    const [result, setResult] = useState<maxMinValueInterface>()
    const onSubmit = async (values: any) => {
        const response = await fetch(`http://localhost:4000/max-min-value/${values.currencyCode}/${values.lastQuotations}`, {
                credentials: 'include',
                method: 'get',
                headers: {'Content-Type': 'application/json'}});
        const data = await response.json();
        setResult(data);
    }
    return (
        <Box w={1000}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text>2. Max Min Value</Text>
            <VStack>
                <HStack>
                    <Input
                        type="number"
                        placeholder="Number of last quotations"
                        {...register("lastQuotations", {
                        required: "Please enter the number of last quotations",
                        minLength: 1,
                        maxLength: 3
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
                {result?.min && result?.max ? <Text>Min: {result.min.toString()} Max: {result.max.toString()}</Text> : result?.error ? <Text>Error: {result.error}</Text> : null}
            </VStack>
          </form>          
        </Box>
      );
}