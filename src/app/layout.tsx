import './globals.css'
import {ReactNode} from 'react'
import {Chakra} from "@/lib/chakra-provider";
import Navbar from "@/components/NavBar";
import {Box} from "@chakra-ui/react";

export const metadata = {
    title: 'David Nakonechnyy Website',
    description: 'All things David Nakonechnyy',
}

export default function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="en" data-theme="dark" style={{colorScheme: "dark"}} suppressHydrationWarning>
        <body>
        <Chakra>
            <Box minH="100vh" bg="background" color="accent">
                <Navbar/>
                {children}
            </Box>
        </Chakra>
        </body>
        </html>
    );
}