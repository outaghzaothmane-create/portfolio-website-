import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { Footer } from '../Footer';
import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: any) => <div className={className}>{children}</div>,
    },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Github: () => <div data-testid="github-icon" />,
    Linkedin: () => <div data-testid="linkedin-icon" />,
    Mail: () => <div data-testid="mail-icon" />,
}));

describe('Hero Section', () => {
    it('renders with responsive background classes', () => {
        const { container } = render(<Hero />);
        const section = container.querySelector('section');
        expect(section).toHaveClass('min-h-[60vh]');
        expect(section).toHaveClass('md:min-h-[80vh]');
        expect(section).toHaveClass('bg-gradient-to-b');
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
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders social icons', () => {
        render(<Footer />);
        expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
});
