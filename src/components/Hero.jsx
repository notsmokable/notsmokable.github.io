import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRandomImage } from '../hooks/useRandomImage';
import GlitchText from './GlitchText';

const Hero = () => {
    const { getRandomImage, images } = useRandomImage();
    const [bgImage, setBgImage] = useState(null);

    // Preload and set background
    const changeBackground = () => {
        const nextImage = getRandomImage();
        if (!nextImage) return;

        const img = new Image();
        img.src = nextImage;
        img.onload = () => {
            setBgImage(nextImage);
        };
    };

    // Set initial background
    useEffect(() => {
        if (images.length > 0 && !bgImage) {
            changeBackground();
        }
    }, [images]);

    // Cycle background on click
    const handleCycle = () => {
        changeBackground();
    };

    useEffect(() => {
        // Auto cycle every 3 seconds
        const interval = setInterval(() => {
            if (images.length > 0) changeBackground();
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <section
            className="hero-section"
            onClick={handleCycle}
            style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000'
            }}
        >
            {/* Background Image */}
            <AnimatePresence mode='popLayout'>
                {bgImage && (
                    <motion.div
                        key={bgImage} // Re-render motion div on change for transition
                        initial={{ opacity: 0, scale: 1.1, filter: 'grayscale(100%) contrast(150%)' }}
                        animate={{ opacity: 0.6, scale: 1, filter: 'grayscale(0%) contrast(120%)' }}
                        exit={{ opacity: 0, scale: 1.1 }} // Smooth fade out
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url("${bgImage}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="content" style={{ zIndex: 10, textAlign: 'center', mixBlendMode: 'hard-light' }}>
                <GlitchText text="NOTSMOKABLE" as="h1" className="hero-title" />


                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
                    style={{ marginTop: '5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.2em' }}
                >
                    SCROLL TO EXPLORE
                </motion.div>
            </div>

        </section>
    );
};

export default Hero;
