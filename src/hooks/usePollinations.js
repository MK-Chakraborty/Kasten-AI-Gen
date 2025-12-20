import { useCallback, useEffect, useState } from 'react';
import { storageUtils } from '../utils/storage';

export const usePollinations = (prompt, height, width, seed, model) => {
    const [generatedImage, setGeneratedImage] = useState(null);
    const [modelList, setModelList] = useState([]);
    const [loading, setLoading] = useState({ status: false, message: "" });
    const [error, setError] = useState(null);

    // Load cached images on initial mount
    useEffect(() => {
        const savedImages = localStorage.getItem('pollinationsImages');
        if (savedImages) {
            try {
                const parsed = JSON.parse(savedImages);
                // Note: We'll handle displaying these in the Result component
            } catch (error) {
                console.error('Error parsing cached images:', error);
            }
        }
    }, []);

    const saveImageToCache = useCallback((imageData) => {
        try {
            const imagesArray = storageUtils.getParsed('pollinationsImages', []);

            const imageId = Date.now().toString();
            const newImage = {
                id: imageId,
                url: imageData,
                prompt: prompt,
                model: model,
                seed: seed,
                width: width,
                height: height,
                timestamp: new Date().toISOString(),
                downloaded: false
            };

            imagesArray.unshift(newImage);

            // Use storage utility with size limit
            storageUtils.saveWithLimit('pollinationsImages', imagesArray, 50);

            return imageId;
        } catch (error) {
            console.error('Error saving image to cache:', error);
            return null;
        }
    }, [prompt, model, seed, width, height]);

    const fetchImageGenerator = useCallback(async () => {
        if (!prompt) {
            setError("Please provide a prompt");
            return;
        }

        try {
            setLoading({ status: true, message: "Generating Image..." });
            setError(null);

            const response = await fetch(
                `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`
            );

            if (!response.ok) throw new Error(`Something went wrong! Can't generate image now, due to too many requests. Please try again later. ${response.status}`);

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            // Save to cache and get image ID
            const imageId = saveImageToCache(imageUrl);

            setGeneratedImage({
                url: imageUrl,
                id: imageId,
                prompt: prompt,
                model: model,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading({ status: false, message: "" });
        }
    }, [prompt, height, width, seed, model, saveImageToCache]);

    const fetchModelList = useCallback(async () => {
        try {
            setLoading(prev => ({ ...prev, status: true, message: "fetching models" }));

            const response = await fetch(`https://image.pollinations.ai/models`);
            if (!response.ok) throw new Error(`Something went wrong! Please try again later. ${response.status}`);

            setModelList(await response.json());
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, status: false, message: "" }));
        }
    }, []);

    useEffect(() => {
        fetchModelList();
    }, [fetchModelList]);

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            if (generatedImage?.url) {
                URL.revokeObjectURL(generatedImage.url);
            }
        };
    }, [generatedImage]);

    // Function to mark image as downloaded
    const markAsDownloaded = useCallback((imageId) => {
        try {
            const savedImages = localStorage.getItem('pollinationsImages');
            if (savedImages) {
                const imagesArray = JSON.parse(savedImages);
                const updatedArray = imagesArray.map(img =>
                    img.id === imageId ? { ...img, downloaded: true } : img
                );
                localStorage.setItem('pollinationsImages', JSON.stringify(updatedArray));
                return true;
            }
        } catch (error) {
            console.error('Error marking image as downloaded:', error);
        }
        return false;
    }, []);

    // Function to get all cached images
    const getCachedImages = useCallback(() => {
        try {
            const savedImages = localStorage.getItem('pollinationsImages');
            return savedImages ? JSON.parse(savedImages) : [];
        } catch (error) {
            console.error('Error getting cached images:', error);
            return [];
        }
    }, []);

    // Function to get downloaded images only
    const getDownloadedImages = useCallback(() => {
        const allImages = getCachedImages();
        return allImages.filter(img => img.downloaded);
    }, [getCachedImages]);

    return {
        generatedImage,
        modelList,
        loading,
        error,
        imageGenerator: fetchImageGenerator,
        markAsDownloaded,
        getCachedImages,
        getDownloadedImages
    };
};