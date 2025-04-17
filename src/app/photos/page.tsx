
import { Box, Heading } from '@chakra-ui/react'
import ImageGallery from "@/components/PhotoGallery";

export default function Photos() {
    return (
        <Box textAlign="center" mt={20}>
            <Heading size="2xl" mb={4}>Photos</Heading>
            <ImageGallery/>
        </Box>
    )
}
