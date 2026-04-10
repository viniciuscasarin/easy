import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Sidebar } from './Sidebar'

describe('Sidebar Component', () => {
    it('renders correctly with navigation links', () => {
        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        )

        expect(screen.getByText('Gestão Revendedores')).toBeInTheDocument()
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Itens')).toBeInTheDocument()
        expect(screen.getByText('Revendedores')).toBeInTheDocument()
        expect(screen.getByText('Lançamentos')).toBeInTheDocument()
        expect(screen.getByText('Backup')).toBeInTheDocument()
    })
})
