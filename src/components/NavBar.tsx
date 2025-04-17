"use client"

import {Box, Button, Flex, HStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import type {ReactElement} from "react";

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Travel', href: '/travel' },
    { name: 'Photos', href: '/photos' },
];

const NavLink = ({ name, href }: { name: string; href: string }) => {
    const router = useRouter();
    return (
        <Button
            size="2xl"
            variant="ghost"
            color="accent"
            onClick={() => router.push(href)}
            _hover={{ color: 'whiteAlpha.100', bg: 'transparent' }}
        >
            {name}
        </Button>
    );
};

export default function Navbar(): ReactElement {
    const [scrollingDown, setScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollingDown(currentScrollY > lastScrollY && currentScrollY > 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <Box
            px={4}
            position="sticky"
            top={0}
            zIndex={1000}
            bg="background"
            transition="transform 0.3s ease"
            transform={scrollingDown ? "translateY(-100%)" : "translateY(0)"}
        >
            <Flex h={16} align="center" justify="center" w="100%">
                <HStack gap={[2, 4, 6]} w={['100%', '75%', '50%']} justify="space-evenly">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} {...link} />
                    ))}
                </HStack>
            </Flex>
        </Box>
    );
}