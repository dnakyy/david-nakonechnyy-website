// theme.ts
import {createSystem, defaultConfig} from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: "'Montserrat', sans-serif" },
                body: { value: "'Montserrat', sans-serif" },
            },
            colors: {
                background: {
                    value: "#1B1B1B", // Eerie Black
                },
                accent: {
                    value: "#50C878", //Emerald
                },
            },
        },
    }
});

export default system
