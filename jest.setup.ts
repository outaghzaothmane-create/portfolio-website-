import '@testing-library/jest-dom';
import React from 'react';

// Mock window.matchMedia which is missing in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
  usePathname() {
    return '';
  },
}));

// Mock framer-motion and filter out motion props from rendered DOM nodes
jest.mock('framer-motion', () => {
  const Dummy = ({
    children,
    className,
    id,
    initial,
    whileInView,
    animate,
    exit,
    transition,
    variants,
    viewport,
    whileHover,
    whileTap,
    layout,
    ...props
  }: any) => {
    return React.createElement('div', { className, id, ...props }, children);
  };
  
  const DummySection = ({
    children,
    className,
    id,
    initial,
    whileInView,
    animate,
    exit,
    transition,
    variants,
    viewport,
    whileHover,
    whileTap,
    layout,
    ...props
  }: any) => {
    return React.createElement('section', { className, id, ...props }, children);
  };
  
  return {
    motion: {
      div: Dummy,
      section: DummySection,
      p: Dummy,
      span: Dummy,
      button: Dummy,
      a: Dummy,
      h1: Dummy,
      h2: Dummy,
      header: Dummy,
      footer: Dummy,
    },
    AnimatePresence: ({ children }: any) => children,
    useScroll: () => ({ scrollYProgress: { onChange: () => {} } }),
    useTransform: () => {},
    useSpring: () => {},
  };
});

// Mock GSAP and @gsap/react
jest.mock('gsap', () => ({
  registerPlugin: () => {},
  timeline: () => ({
    to: () => {},
    from: () => {},
    fromTo: () => {},
  }),
  to: () => {},
  from: () => {},
  fromTo: () => {},
}));

jest.mock('@gsap/react', () => ({
  useGSAP: (callback: any) => {
    if (typeof callback === 'function') {
      callback();
    }
  },
}));

// Mock OrbitSpace and other complex UI sub-components to prevent rendering issues in JSDOM using pure JS/TS objects
jest.mock('@/components/ui/orbit-space', () => ({
  OrbitSpace: () => React.createElement('div', { 'data-testid': 'orbit-space' })
}));

jest.mock('@/components/ui/blur-fade', () => ({
  BlurFade: ({ children }: any) => React.createElement('div', { 'data-testid': 'blur-fade' }, children)
}));

jest.mock('@/components/ui/magnetic-button', () => ({
  MagneticButton: ({ children, href, onClick, className }: any) => React.createElement(
    'a', 
    { href, onClick, className, 'data-testid': 'magnetic-button' }, 
    children
  )
}));

jest.mock('@/components/ui/hyper-text', () => ({
  HyperText: ({ text }: any) => React.createElement('span', { 'data-testid': 'hyper-text' }, text)
}));
