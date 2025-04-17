import {Box, Heading, HStack} from '@chakra-ui/react'
import TravelCard from "@/components/TravelCard";

export default function Travel() {
    return (
        <Box textAlign="center" mt={20}>
            <Heading size="2xl" mb={4}>Travel</Heading>
            <HStack justify="center" w="100%">
                <TravelCard/>
                <TravelCard/>
                <TravelCard/>
            </HStack>
        </Box>
    )
}
