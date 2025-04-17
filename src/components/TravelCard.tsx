"use client"

import {Box, Card, Center, Flex, Image, Text} from "@chakra-ui/react";
import {ReactElement} from "react";

export default function TravelCard(): ReactElement {
    return (
        <Center mt={10}>
            <Card.Root maxW="sm" w="100%" overflow="hidden">
                <Box position="relative" w="100%">
                    <Image
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt="Green double couch with wooden legs"
                        w="100%"
                        h="auto"
                        objectFit="cover"
                    />
                    <Flex
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        align="center"
                        justify="center"
                        bg="rgba(0, 0, 0, 0.4)"
                        color="white"
                    >
                        <Text fontSize="xl" fontWeight="bold">
                            Living Room Sofa
                        </Text>
                    </Flex>
                </Box>
            </Card.Root>
        </Center>
    )
}