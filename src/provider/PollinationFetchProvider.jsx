import { useState } from "react";
import { PollinationFetchContext } from "../context";
import { usePolinations } from "../hooks";

export default function PollinationFetchProvider({ children }) {
  const [promptData, setPromptData] = useState({});
  const { prompt, height, width, seed, model } = promptData;
  const { generatedImage, modelList, loading, error, imageGenerator } =
    usePolinations(prompt, height, width, seed, model);

  return (
    <PollinationFetchContext.Provider
      value={{
        setPromptData,
        modelList,
        loading,
        error,
        generatedImage,
        imageGenerator,
      }}
    >
      {children}
    </PollinationFetchContext.Provider>
  );
}
