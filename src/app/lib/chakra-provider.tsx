"use client"

import {ChakraProvider} from "@chakra-ui/react"
import system from "@/app/lib/theme";
import React from "react";
import {ThemeProvider} from "next-themes";

export const Chakra = ({children}: { children: React.ReactNode }) => {
    return (
        <ChakraProvider value={system}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </ChakraProvider>
    )
}