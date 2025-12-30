import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

const ImageModal = ({ isOpen, image, onClose, onNext, onPrev }) => {
    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen || !image) return null;

    // Create mailto link
    // We use window.location.href to get the current URL (which will include the permalink)
    const handlePurchase = () => {
        const subject = "Purchase Inquiry: Artwork Interest";
        const body = `Hello,\n\nI am interested in purchasing this artwork:\n${window.location.href}\n\nPlease let me know the details.\n\nThanks.`;
        window.location.href = `mailto:notsmoke21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 10000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontFamily: 'monospace',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        zIndex: 10002
                    }}
                >
                    [CLOSE]
                </button>

                {/* Main Content Container */}
                <div style={{ position: 'relative', width: '90%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {/* Prev Arrow */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="nav-arrow left"
                        style={{
                            position: 'absolute',
                            left: 0,
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            fontSize: '4rem',
                            cursor: 'pointer',
                            zIndex: 10001,
                            fontFamily: 'var(--font-display)',
                            textShadow: '0 0 10px var(--color-primary)'
                        }}
                    >
                        &lt;
                    </button>

                    {/* Image */}
                    <motion.img
                        key={image} // Key change triggers animation
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={image}
                        alt="Full Screen View"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            boxShadow: '0 0 20px rgba(0,0,0,0.8)'
                        }}
                    />

                    {/* Next Arrow */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="nav-arrow right"
                        style={{
                            position: 'absolute',
                            right: 0,
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            fontSize: '4rem',
                            cursor: 'pointer',
                            zIndex: 10001,
                            fontFamily: 'var(--font-display)',
                            textShadow: '0 0 10px var(--color-primary)'
                        }}
                    >
                        &gt;
                    </button>
                </div>

                {/* Purchase Button */}
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--color-nintendo)', color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePurchase}
                    style={{
                        marginTop: '2rem',
                        padding: '1rem 2rem',
                        background: 'transparent',
                        border: '2px solid var(--color-nintendo)',
                        color: 'var(--color-nintendo)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        boxShadow: '0 0 15px rgba(230, 0, 18, 0.4)'
                    }}
                >
                    PURCHASE INQUIRY
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageModal;
