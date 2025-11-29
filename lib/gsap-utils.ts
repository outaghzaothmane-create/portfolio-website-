import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export const registerGSAP = () => {
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, useGSAP);
    }
};
