import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { MainLayout } from './MainLayout'

describe('MainLayout Component', () => {
    it('renders Sidebar and Outlet placeholder', () => {
        render(
            <MemoryRouter>
                <MainLayout />
            </MemoryRouter>
        )

        // Sidebar brand text
        expect(screen.getByText('Easy')).toBeInTheDocument()
    })
})
