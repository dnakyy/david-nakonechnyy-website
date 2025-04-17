"use client";

import {
    Dialog,
    DialogTrigger,
    DialogBackdrop,
    DialogPositioner,
    DialogContent, AspectRatio, Box,
} from "@chakra-ui/react";
import {Image, SimpleGrid} from "@chakra-ui/react";

const images = [
    "/photos/japan/ToriiGates.jpg",
    "/photos/japan/BambooForest.jpg",
    "/photos/japan/TokyoTower.jpg",
    "/photos/japan/Shibuya.jpg",
];

export default function ImageGallery() {
    return (
        <SimpleGrid columns={[1, 2, 3, 4]} gap={4} px={[4, 6, 8]} w="100%">
            {images.map((src, index) => (
                <Dialog.Root key={index}>
                    <Box w="100%" maxW="100%" aspectRatio={4 / 3} overflow="hidden" borderRadius="md">
                        <DialogTrigger asChild>
                            <Image
                                src={src}
                                alt={`Photo ${index + 1}`}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                cursor="pointer"
                                _hover={{ transform: "scale(1.03)", transition: "0.2s" }}
                            />
                        </DialogTrigger>
                    </Box>
                    <DialogBackdrop />
                    <DialogPositioner alignItems="center" justifyContent="center">
                    <DialogContent bg="transparent" boxShadow="none">
                            <Image
                                src={src}
                                alt={`Zoomed Photo ${index + 1}`}
                                maxH="90vh"
                                mx="auto"
                                borderRadius="md"
                                objectFit="contain"
                            />
                        </DialogContent>
                    </DialogPositioner>
                </Dialog.Root>
            ))}
        </SimpleGrid>

    );
}
