
import { Box, Heading } from '@chakra-ui/react'
import GoogleDriveGallery from "@/components/GoogleDriveGallery";

export default function Photos() {
    return (
        <Box textAlign="center" mt={20}>
            <Heading size="2xl" mb={6}>Photos</Heading>
            <GoogleDriveGallery />
        </Box>
    )
}
