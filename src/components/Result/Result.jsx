import { useContext, useEffect, useState } from "react";
import image1 from "../../assets/images/ai-image-1.jpeg";
import image2 from "../../assets/images/ai-image-2.jpeg";
import { default as image3 } from "../../assets/images/ai-image-3.jpeg";
import { default as image4 } from "../../assets/images/ai-image-4.jpeg";
import { default as image5 } from "../../assets/images/ai-image-5.jpeg";
import { default as image6 } from "../../assets/images/ai-image-6.jpeg";
import { PollinationFetchContext } from "../../context";
import CreatedImage from "./CreatedImages";

export default function Result() {
  const { generatedImage, loading, error, getCachedImages } = useContext(
    PollinationFetchContext
  );

  const [imgArray, setImgArray] = useState([
    { url: image1, id: "placeholder1", isPlaceholder: true },
    { url: image2, id: "placeholder2", isPlaceholder: true },
    { url: image3, id: "placeholder3", isPlaceholder: true },
    { url: image4, id: "placeholder4", isPlaceholder: true },
    { url: image5, id: "placeholder5", isPlaceholder: true },
    { url: image6, id: "placeholder6", isPlaceholder: true },
  ]);

  // Load cached images on mount and when new image is generated
  useEffect(() => {
    const cachedImages = getCachedImages ? getCachedImages() : [];

    // Combine cached images with placeholders
    // Filter out any null/undefined URLs and limit to reasonable number
    const validCachedImages = cachedImages
      .filter((img) => img && img.url)
      .map((img) => ({ ...img, isPlaceholder: false }));

    // Keep placeholders only if we don't have enough cached images
    const allImages = [
      ...validCachedImages,
      ...imgArray.filter((img) => img.isPlaceholder),
    ].slice(0, 12); // Limit to 12 images total

    setImgArray(allImages);
  }, [generatedImage, getCachedImages]);

  return (
    <section className="mx-2">
      <p className="text-2xl my-8">Your creations can truly be amazing!</p>
      {loading.status && (
        <div className="text-center">
          <span className="loading loading-bars loading-xl"></span>
          <p className="text-xl my-4">
            Please wait! Image generation ongoing...
          </p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-sm my-4">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {imgArray.map((img, index) => (
          <CreatedImage
            key={img.id || index}
            imgSrc={img.url}
            imageData={img}
          />
        ))}
      </div>
    </section>
  );
}
