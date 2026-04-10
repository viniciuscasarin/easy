import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
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

    it('toggles command center on Ctrl+K', () => {
        render(
            <MemoryRouter>
                <MainLayout />
            </MemoryRouter>
        )

        const event = new KeyboardEvent('keydown', {
            key: 'k',
            ctrlKey: true,
            bubbles: true,
            cancelable: true
        })

        const preventDefault = vi.spyOn(event, 'preventDefault')

        fireEvent(document, event)

        expect(preventDefault).toHaveBeenCalled()
        // The CommandCenter should be visible (mock it or check for its placeholder)
        expect(screen.getByPlaceholderText(/Digite um comando/i)).toBeInTheDocument()
    })
})
