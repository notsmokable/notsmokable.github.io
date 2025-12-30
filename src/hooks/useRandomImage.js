import { useState, useEffect } from 'react';

/**
 * useRandomImage Hook
 * Scans src/assets/collages for files.
 * Updated to be more robust with file extensions.
 */
export const useRandomImage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Glob all images - trying to cover all cases
        const glob = import.meta.glob('/src/assets/collages/*.{png,jpg,jpeg,svg,webp,gif,PNG,JPG,JPEG,SVG,WEBP,GIF}', {
            eager: true,
            query: '?url',
            import: 'default'
        });

        const urls = Object.values(glob);
        console.log('useRandomImage found:', urls.length, 'images');
        console.log('First image:', urls[0]);

        setImages(urls);
    }, []);

    const getRandomImage = () => {
        if (images.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const getRandomImages = (count) => {
        if (images.length === 0) return [];
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return { images, getRandomImage, getRandomImages };
};
