import React from 'react';
import { motion } from 'framer-motion';
import { useRandomImage } from '../hooks/useRandomImage';
import GlitchText from './GlitchText';
import ImageModal from './ImageModal';
import { useSearchParams } from 'react-router-dom';




const Gallery = () => {
    const { images } = useRandomImage();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedImageId = searchParams.get('img');

    const getImageId = (url) => url.split('/').pop();

    const selectedIndex = images.findIndex(
        (img) => getImageId(img) === selectedImageId
    );

    const handleOpen = (imgUrl) => {
        setSearchParams({ img: getImageId(imgUrl) });
    };

    const handleClose = () => setSearchParams({});

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

    const currentImage =
        selectedIndex !== -1 ? images[selectedIndex] : null;

    const styles = `
.gallery-section {
  padding: 4rem 2rem;
  background-color: var(--color-bg);
  position: relative;
  z-index: 10;
}

.gallery-header {
  margin-bottom: 4rem;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 1rem;
}

.gallery-subtitle {
  font-family: monospace;
  color: var(--color-secondary);
  margin-top: 0.5rem;
}

.gallery-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.gallery-image {
  position: relative;
  padding-bottom: 75%;
  background: #111;
  overflow: hidden;
  border: 2px solid white;
  cursor: pointer;
}

.gallery-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-caption {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-family: monospace;
}

.open-tag {
  color: var(--color-primary);
}

/* 📱 MOBILE */
@media (max-width: 768px) {
  .gallery-section {
    padding: 1.5rem 1rem;
  }

  .gallery-header {
    margin-bottom: 1.5rem;
  }

  .gallery-header h2 {
    font-size: 1.75rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .gallery-caption {
    font-size: 0.7rem;
  }
}
`;




    return (
        <>
            <style>{styles}</style>
            <section className="gallery-section">
                {/* Header */}
                <div className="gallery-header">
                    <GlitchText
                        text=""
                        as="h2"
                        style={{ color: 'var(--color-text)' }}
                    />
                    <p className="gallery-subtitle">
          // ARCHIVE ACCESS /// GRANTED ({images.length} FILES FOUND)
                    </p>
                </div>

                {/* Grid */}
                <motion.div className="gallery-grid">
                    {images.map((img, index) => (
                        <motion.div
                            key={img}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="gallery-item-wrapper"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="gallery-image"
                                onClick={() => handleOpen(img)}
                            >
                                <img src={img} alt={`Collage ${index}`} />
                                <div className="hover-overlay">
                                    <span>VIEW</span>
                                </div>
                            </motion.div>

                            <div className="gallery-caption">
                                <span>ITEM_{index + 1}</span>
                                <span className="open-tag">[OPEN]</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {images.length === 0 && (
                    <div className="gallery-empty">LOADING DATA...</div>
                )}

                <ImageModal
                    isOpen={!!currentImage}
                    image={currentImage}
                    onClose={handleClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </section>
        </>
    );
};

export default Gallery;
