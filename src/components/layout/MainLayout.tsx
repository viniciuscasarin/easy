import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function MainLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen w-full bg-background">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex" />

            {/* Mobile Nav */}
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
                <header className="h-16 border-b flex items-center px-4 lg:hidden shrink-0">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                            <Menu size={20} />
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <Sidebar className="w-full border-r-0" onItemClick={() => setIsMenuOpen(false)} />
                        </SheetContent>
                    </Sheet>
                    <div className="ml-4 font-semibold text-lg">Easy</div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
