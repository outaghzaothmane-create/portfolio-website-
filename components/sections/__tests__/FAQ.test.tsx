import { render, screen } from '@testing-library/react';
import { FAQ } from '../FAQ';
import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        section: ({ children, className, id }: any) => <section id={id} className={className}>{children}</section>,
        div: ({ children, className }: any) => <div className={className}>{children}</div>,
    },
}));

describe('FAQ Section', () => {
    it('renders FAQ section title', () => {
        render(<FAQ />);
        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('renders list of default FAQ questions', () => {
        render(<FAQ />);
        expect(screen.getByText('What is Generative Engine Optimization?')).toBeInTheDocument();
        expect(screen.getByText('How does AI Search Optimization work?')).toBeInTheDocument();
    });

    it('renders with custom dictionary translations', () => {
        const customDict = {
            title: "Questions Fréquentes",
            items: [
                {
                    question: "Qu'est-ce que l'optimisation des moteurs génératifs ?",
                    answer: "GEO est le processus d'optimisation..."
                }
            ]
        };
        render(<FAQ dict={customDict} />);
        expect(screen.getByText('Questions Fréquentes')).toBeInTheDocument();
        expect(screen.getByText("Qu'est-ce que l'optimisation des moteurs génératifs ?")).toBeInTheDocument();
        expect(screen.getByText("GEO est le processus d'optimisation...")).toBeInTheDocument();
    });
});
