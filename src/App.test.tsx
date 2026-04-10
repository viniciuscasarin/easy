import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Integration Tests', () => {
    it('navigates to the resellers page when the link is clicked', () => {
        render(<App />)

        expect(screen.getByText('Bem-vindo ao Sistema de Gestão de Revendedores.')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Revendedores'))
        expect(screen.getByText('Gestão de Revendedores.')).toBeInTheDocument()
    })
})
