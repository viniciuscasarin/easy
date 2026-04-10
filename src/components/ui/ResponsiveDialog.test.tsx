import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResponsiveDialog } from './ResponsiveDialog'
import React from 'react'

describe('ResponsiveDialog', () => {
    beforeEach(() => {
        // Reset matchMedia mock
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(), // deprecated
                removeListener: vi.fn(), // deprecated
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        })
    })

    it('should render Dialog on desktop (> 1024px)', () => {
        // Mock desktop
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: query === '(min-width: 1024px)',
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }))

        render(
            <ResponsiveDialog
                open={true}
                onOpenChange={() => { }}
                title="Test Title"
                description="Test Description"
            >
                <div>Content</div>
            </ResponsiveDialog>
        )

        // Dialog typically uses DialogContent/DialogTitle
        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should render Drawer on mobile (< 1024px)', () => {
        // Mock mobile
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }))

        render(
            <ResponsiveDialog
                open={true}
                onOpenChange={() => { }}
                title="Test Title Mobile"
                description="Test Description Mobile"
            >
                <div>Mobile Content</div>
            </ResponsiveDialog>
        )

        expect(screen.getByText('Test Title Mobile')).toBeInTheDocument()
        expect(screen.getByText('Test Description Mobile')).toBeInTheDocument()
        expect(screen.getByText('Mobile Content')).toBeInTheDocument()
    })
})
