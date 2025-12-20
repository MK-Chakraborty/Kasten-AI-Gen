import { useContext, useEffect, useState } from "react";
import { PollinationFetchContext } from "../context";
import CreatedImage from "./Result/CreatedImages";

export default function Downloaded() {
  const { getDownloadedImages } = useContext(PollinationFetchContext);
  const [downloadedImages, setDownloadedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDownloadedImages = () => {
      try {
        if (getDownloadedImages) {
          const images = getDownloadedImages();
          setDownloadedImages(images);
        }
      } catch (error) {
        console.error("Error loading downloaded images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDownloadedImages();

    // Refresh when component gains focus
    const handleFocus = () => {
      loadDownloadedImages();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [getDownloadedImages]);

  if (loading) {
    return (
      <section className="mx-2">
        <p className="text-2xl my-8">Downloaded Images</p>
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading downloaded images...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-2">
      <div className="flex justify-between items-center my-8">
        <p className="text-2xl">Downloaded Images</p>
        {downloadedImages.length > 0 && (
          <span className="text-sm bg-[#26cefb] text-gray-900 px-3 py-1 rounded-full">
            {downloadedImages.length} image
            {downloadedImages.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {downloadedImages.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-[#26cefb] rounded-xl">
          <p className="text-xl mb-4">No downloaded images yet</p>
          <p className="text-gray-400">
            Generate and download images from the "Create Image" tab to see them
            here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {downloadedImages.map((img) => (
            <CreatedImage key={img.id} imgSrc={img.url} imageData={img} />
          ))}
        </div>
      )}
    </section>
  );
}
