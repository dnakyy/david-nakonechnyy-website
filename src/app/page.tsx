"use client";

import { useEffect, useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import SocialIcons from "@/components/SocialIcons";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <VStack>
            <Box pt={32} textAlign="center" px={4}>
                <Heading
                    size="3xl"
                    mb={2}
                    animation={`${fadeIn} 1s ease-in forwards`}
                >
                    I&#39;m a Nomadic Potato
                </Heading>
                <Heading
                    size="2xl"
                    animation={`${fadeIn} 1.5s ease-in forwards`}
                >
                    Capturing stories, embracing adventures, and savoring every moment
                </Heading>
            </Box>
            <VStack pt={32}>
                <SocialIcons />
            </VStack>
        </VStack>
    );
}
