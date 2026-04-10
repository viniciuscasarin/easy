import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from './button'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" disabled>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        )
    }

    const isDark = resolvedTheme === 'dark'

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title={isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            aria-label={isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
        >
            {isDark ? (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
        </Button>
    )
}
