import {Box, Heading, HStack, Image, Text, VStack} from "@chakra-ui/react";

export default function AboutMe() {
    return (
        <Box mt={20} px={8}>
            <VStack>
                <Heading size="2xl" mb={8} textAlign="center">
                    About Me
                </Heading>
            </VStack>

            <HStack gap={10} align="start" justify="center">
                <Image
                    src="/photos/David.jpg"
                    alt="David Nakonechnyy"
                    boxSize="300px"
                    objectFit="cover"
                    borderRadius="xl"
                />
                <Box maxW="500px" textAlign="left">
                    <Heading size="lg" mb={2}>
                        Hi, I'm David Nakonechnyy
                    </Heading>
                    <VStack align="start" gap={4}>
                        <Text fontSize="lg">
                            I'm a software engineer, world traveler, and amateur photographer with a passion for capturing stories from every corner of the globe and sharing perspectives that connect us.
                        </Text>
                        <Text fontSize="lg">
                            In recent years, I've adopted the playful nickname "Nomadic Potato." The "potato" part proudly reflects my Slavic heritage, as my family originates from Ukraine—and frankly, I could eat potatoes for every meal! "Nomadic" speaks to my constant desire for adventure and exploration.
                        </Text>
                        <Text fontSize="lg">
                            Through the stories I tell about my journeys, I hope to inspire others to pursue their own adventures. Life moves quickly—live fully in each moment, and create memories without regrets.
                        </Text>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}
