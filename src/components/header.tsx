'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import ThemeSwitcher from './themeswitcher'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
    { href: '/', label: 'Home' },
]

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
            <div className="container flex h-16 items-center ml-7">
                <Link href="/" className="flex items-center gap-2 mr-6 hover:opacity-80 transition-opacity">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Globe className="h-6 w-6" />
                    </motion.div>
                    <span className="text-xl font-bold">CountryApp</span>
                </Link>

                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                        {navItems.map(({ href, label }) => (
                            <NavigationMenuItem key={href}>
                                <NavigationMenuLink asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link href={href} className="text-sm font-medium transition-colors hover:text-primary">
                                            {label}
                                        </Link>
                                    </motion.div>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center ml-auto gap-4">
                    <ThemeSwitcher />
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle mobile menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isMenuOpen ? 'close' : 'open'}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </motion.div>
                            </AnimatePresence>
                        </Button>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        id="mobile-menu"
                        className="md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <ul className="container py-4 flex flex-col gap-4">
                            {navItems.map(({ href, label }, index) => (
                                <motion.li
                                    key={href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={href}
                                        className="flex w-full p-2 hover:bg-accent rounded-md transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}