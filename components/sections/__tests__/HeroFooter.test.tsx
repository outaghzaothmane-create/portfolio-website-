import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { Footer } from '../Footer';
import '@testing-library/jest-dom';
import React from 'react';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Github: () => <div data-testid="github-icon" aria-label="GitHub" />,
    Linkedin: () => <div data-testid="linkedin-icon" aria-label="LinkedIn" />,
    Mail: () => <div data-testid="mail-icon" aria-label="Email" />,
    Download: () => <div data-testid="download-icon" />,
    MapPin: () => <div data-testid="mappin-icon" />,
    Clock: () => <div data-testid="clock-icon" />,
}));

describe('Hero Section', () => {
    it('renders with responsive background classes', () => {
        const { container } = render(<Hero />);
        const section = container.querySelector('section');
        expect(section).toHaveClass('min-h-[72vh]');
        expect(section).toHaveClass('md:min-h-screen');
        expect(section).toHaveClass('bg-transparent');
    });
});

describe('Footer Section', () => {
    it('renders copyright notice', () => {
        render(<Footer />);
        expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Footer />);
        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
    });

    it('renders social icons', () => {
        render(<Footer />);
        expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
});
