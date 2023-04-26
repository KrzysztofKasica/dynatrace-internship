import { Input,  Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface buyAskDiffInterface {
    majorDiff?: number;
    error?: string;
}

export function BuyAskDiff() {
    const {
        register,
        handleSubmit,
    } = useForm();
    const [result, setResult] = useState<buyAskDiffInterface>()
    const onSubmit = async (values: any) => {
            const response = await fetch(`http://localhost:4000/buy-ask-diff/${values.currencyCode}/${values.lastQuotations}`, {
                credentials: 'include',
                method: 'get',
                headers: {'Content-Type': 'application/json'}});
            const data = await response.json();
            setResult(data);
    }
    return (
        <Box w={1000}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text>3. Major buy ask rate difference</Text>
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
                {result?.majorDiff ? <Text>Major difference: {result.majorDiff.toString()}</Text> : result?.error ? <Text>Error: {result.error}</Text> : null}
            </VStack>
          </form>
          
        </Box>
      );
}