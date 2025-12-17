import { useEffect, useState } from "react";
import { PollinationFetchContext } from "../context";
import { usePollinations } from "../hooks";

export default function PollinationFetchProvider({ children }) {
  const [promptData, setPromptData] = useState({});
  const { prompt, height, width, seed, model } = promptData;
  const { generatedImage, modelList, loading, error, imageGenerator } =
    usePollinations(prompt, height, width, seed, model);

  useEffect(() => {
    if (prompt && width && height) {
      imageGenerator();
    }
  }, [prompt, width, height, seed, model]);

  return (
    <PollinationFetchContext.Provider
      value={{
        setPromptData,
        modelList,
        loading,
        error,
        generatedImage,
      }}
    >
      {children}
    </PollinationFetchContext.Provider>
  );
}
