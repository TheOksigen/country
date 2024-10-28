"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
    const [theme, setThemeState] = useState<boolean>(false);


    useEffect(() => {
        const isDarkMode = localStorage.getItem("theme") === "true";
        setThemeState(isDarkMode);
        document.documentElement.classList.toggle("dark", isDarkMode);  

    }, [])
    
    const toggleDarkMode = () => {
        const newTheme = !theme;
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme.toString());
        document.documentElement.classList.toggle("dark", newTheme);
    }

    return (
        <>        
        <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            aria-label="Toggle theme"
            onClick={toggleDarkMode}
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
        </>
    );
};


export default ThemeSwitcher;