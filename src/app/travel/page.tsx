import { Box, Heading } from "@chakra-ui/react";
import NotionPage from "@/components/NotionPage";
import { getMarkdownFromNotion } from "@/lib/notion";

export default async function TravelPage() {
    const markdown = await getMarkdownFromNotion("1d9ee40c1667800084a9e614b50deaa4");

    return (
        <Box textAlign="center" mt={20}>
            <Heading size="2xl" mb={4}>Travel</Heading>
            <NotionPage markdown={markdown} />
        </Box>
    );
}