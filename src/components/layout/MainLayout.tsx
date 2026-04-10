import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function MainLayout() {
    return (
        <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}
