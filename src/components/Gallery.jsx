import React from 'react';
import { motion } from 'framer-motion';
import { useRandomImage } from '../hooks/useRandomImage';
import GlitchText from './GlitchText';
import ImageModal from './ImageModal';
import { useSearchParams } from 'react-router-dom';

const Gallery = () => {
    const { images } = useRandomImage();

    // Container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedImageId = searchParams.get('img');

    // Helper to extract filename/ID from URL
    const getImageId = (url) => {
        // url is like /src/assets/collages/file.png or /assets/file-Hash.png
        // We can just use the full URL if we want, or the filename.
        // For robustness let's try to match by exact URL first since that's what we have in the list.
        // But URL params look ugly with full paths. 
        // Let's us the index for simplicity in logic, but the filename for the URL.
        return url.split('/').pop();
    };

    const selectedIndex = images.findIndex(img => getImageId(img) === selectedImageId);

    const handleOpen = (imgUrl) => {
        setSearchParams({ img: getImageId(imgUrl) });
    };

    const handleClose = () => {
        setSearchParams({});
    };

    const handleNext = () => {
        if (selectedIndex === -1) return;
        const nextIndex = (selectedIndex + 1) % images.length;
        setSearchParams({ img: getImageId(images[nextIndex]) });
    };

    const handlePrev = () => {
        if (selectedIndex === -1) return;
        const prevIndex = (selectedIndex - 1 + images.length) % images.length;
        setSearchParams({ img: getImageId(images[prevIndex]) });
    };

    const currentImage = selectedIndex !== -1 ? images[selectedIndex] : null;

    const isMobile = window.innerWidth <= 768;


    // Item animation (Simplified)

    return (
        <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--color-bg)', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
            {/* Header */}
            <div style={{ marginBottom: '4rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '1rem' }}>
                <GlitchText text="SELECT YOUR FIGHTER" as="h2" style={{ fontSize: '3rem', color: 'var(--color-text)' }} />
                <p style={{ fontFamily: 'monospace', color: 'var(--color-secondary)', marginTop: '0.5rem' }}>
                    // ARCHIVE ACCESS /// GRANTED ({images.length} FILES FOUND)
                </p>
            </div>

            {/* Grid */}
            <motion.div
                style={{
                    display: 'grid',
                    gap: isMobile ? '0.75rem' : '2rem',
                    gridTemplateColumns: isMobile
                        ? 'repeat(3, 1fr)'
                        : 'repeat(auto-fill, minmax(300px, 1fr))'
                }}
            >
                {images.map((img, index) => (
                    <motion.div
                        key={img}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="gallery-item-wrapper"
                        style={{ position: 'relative' }}
                    >
                        {/* Frame/Border Effect */}
                        <div
                            className="box-glitch"
                            style={{
                                position: 'absolute',
                                top: -10,
                                left: -10,
                                right: 10,
                                bottom: 10,
                                zIndex: 0,
                                opacity: 0,
                                transition: 'opacity 0.2s'
                            }}
                        />

                        {/* Image Container */}
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                position: 'relative',
                                paddingBottom: '75%', // 4:3 Aspect Ratio
                                backgroundColor: '#111',
                                overflow: 'hidden',
                                border: '2px solid white',
                                zIndex: 1,
                                cursor: 'pointer'
                            }}
                            onClick={() => handleOpen(img)}
                        >
                            <img
                                src={img}
                                alt={`Collage ${index}`}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            {/* Overlay on hover */}
                            <div className="hover-overlay">
                                <span>VIEW</span>
                            </div>
                        </motion.div>

                        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace' }}>
                            <span>ITEM_{index + 1}</span>
                            <span style={{ color: 'var(--color-primary)' }}>[OPEN]</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {images.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <p>LOADING DATA...</p>
                </div>
            )}

            {/* Lightbox */}
            <ImageModal
                isOpen={!!currentImage}
                image={currentImage}
                onClose={handleClose}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </section>
    );
};

export default Gallery;
