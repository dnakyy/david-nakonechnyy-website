"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogBackdrop,
    DialogPositioner,
    DialogContent, 
    Box,
    Text,
    Stack,
    Spinner,
} from "@chakra-ui/react";
import { Image, SimpleGrid } from "@chakra-ui/react";
import { googleDriveService, GoogleDriveFile } from "@/lib/google-drive";

export default function GoogleDriveGallery() {
    const [photos, setPhotos] = useState<GoogleDriveFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('/api/photos');

            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }

            const data = await response.json();
            console.log('Photos data:', data);
            setPhotos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load photos');
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (file: GoogleDriveFile) => {
        return googleDriveService.getDirectImageUrl(file.id);
    };

    const getThumbnailUrl = (file: GoogleDriveFile) => {
        // Always use our proxy to avoid rate limiting
        const proxyUrl = googleDriveService.getImageUrl(file.id, 'thumbnail');
        console.log('Using proxy URL for', file.name, ':', proxyUrl);
        return proxyUrl;
    };

    if (error) {
        return (
            <Stack gap={4} align="center" py={8}>
                <Text fontSize="lg" color="red.500">
                    Error: {error}
                </Text>
            </Stack>
        );
    }

    if (loading) {
        return (
            <Stack gap={4} align="center" py={8}>
                <Spinner size="lg" />
                <Text>Loading photos...</Text>
            </Stack>
        );
    }

    if (photos.length === 0) {
        return (
            <Text fontSize="lg" color="gray.500" py={8}>
                No photos found
            </Text>
        );
    }

    return (
        <Stack gap={6} w="100%" align="center">
            <SimpleGrid columns={[1, 2, 3, 4]} gap={4} px={[4, 6, 8]} w="100%">
                {photos.map((photo) => (
                    <Dialog.Root key={photo.id}>
                        <Box w="100%" maxW="100%" aspectRatio={4 / 3} overflow="hidden" borderRadius="md">
                            <DialogTrigger asChild>
                                <Image
                                    src={getThumbnailUrl(photo)}
                                    alt={photo.name}
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
                                    src={getImageUrl(photo)}
                                    alt={photo.name}
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
        </Stack>
    );
}