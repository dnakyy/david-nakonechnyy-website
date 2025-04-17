import {HStack, IconButton, Link} from "@chakra-ui/react";
import {FaGithub, FaLinkedin, FaInstagram, FaYoutube} from "react-icons/fa";

export default function SocialIcons() {
    return (
        <HStack>
            <Link href="https://github.com/dnakyy">
                <IconButton
                    aria-label="GitHub"
                    variant="ghost"
                    color="accent"
                    _hover={{color: 'whiteAlpha.100', bg: 'transparent'}}>
                    <FaGithub/>
                </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/davidnakonechnyy/">
                <IconButton
                    aria-label="LinkedIn"
                    variant="ghost"
                    color="accent"
                    _hover={{color: 'whiteAlpha.100', bg: 'transparent'}}>
                    <FaLinkedin/>
                </IconButton>
            </Link>
            <Link href="https://www.instagram.com/dnakyy">
                <IconButton
                    aria-label="Instagram"
                    variant="ghost"
                    color="accent"
                    _hover={{color: 'whiteAlpha.100', bg: 'transparent'}}>
                    <FaInstagram/>
                </IconButton>
            </Link>
            <Link href="https://www.youtube.com/@Dnakyy">
                <IconButton
                    aria-label="YouTube"
                    variant="ghost"
                    color="accent"
                    _hover={{color: 'whiteAlpha.100', bg: 'transparent'}}>
                    <FaYoutube/>
                </IconButton>
            </Link>
        </HStack>
    );
}