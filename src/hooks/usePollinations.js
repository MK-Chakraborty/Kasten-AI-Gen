import { useCallback, useEffect, useState } from 'react';

export const usePolinations = (prompt, height, width, seed, model) => {

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
            ); // going to return an image.

            if (!response.ok) throw new Error(`Something went wrong! Can't generate image now, due to too many requests. Please try again later. ${response.status}`);

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setGeneratedImage(imageUrl);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, status: false, message: "" }))
        }
    }, [prompt, height, width, seed, model]);

    const fetchModelList = useCallback(async () => {
        try {
            setLoading(prev => ({ ...prev, status: true, message: "fetching models" }));

            const response = await fetch(`https://image.pollinations.ai/models`); // going to return a simple aray. 

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
    }, [])

    return { generatedImage, modelList, loading, error, imageGenerator: fetchImageGenerator };
}