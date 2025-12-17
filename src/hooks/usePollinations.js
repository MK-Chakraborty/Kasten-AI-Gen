import { useCallback, useEffect, useState } from 'react';

export const usePollinations = (prompt, height, width, seed, model) => {

    const [generatedImage, setGeneratedImage] = useState(null);
    const [modelList, setModelList] = useState([]);
    const [loading, setLoading] = useState({ status: false, message: "" });
    const [error, setError] = useState(null);

    const fetchImageGenerator = useCallback(async () => {
        if (!prompt) {
            setError("Please provide a prompt");
            return
        };

        try {
            setLoading(prev => ({ ...prev, status: true, message: "Generating Image..." }));
            setError(null);

            const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`
            );

            if (!response.ok) throw new Error(`Something went wrong! Can't generate image now, due to too many requests. Please try again later. ${response.status}`);

            const imageBlob = await response.blob();

            setGeneratedImage(prev => {
                if (prev) URL.revokeObjectURL(prev);
                return URL.createObjectURL(imageBlob);
            });

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, status: false, message: "" }))
        }
    }, [prompt, height, width, seed, model]);


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

    useEffect(() => {
        return () => {
            if (generatedImage) {
                URL.revokeObjectURL(generatedImage);
            }
        };
    }, [generatedImage]);

    return { generatedImage, modelList, loading, error, imageGenerator: fetchImageGenerator };
}