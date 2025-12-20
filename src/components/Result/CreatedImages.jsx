import { useContext } from "react";
import downloadIcon from "../../assets/images/downloadIcon.png";
import { PollinationFetchContext } from "../../context";

export default function CreatedImage({ imgSrc, imageData }) {
  const { markAsDownloaded } = useContext(PollinationFetchContext);

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // For blob URLs (generated images)
      if (imgSrc.startsWith("blob:")) {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `pollination-image-${imageData?.id || Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        window.URL.revokeObjectURL(downloadUrl);
      }
      // For regular URLs (placeholder images)
      else {
        const link = document.createElement("a");
        link.href = imgSrc;
        link.download = `pollination-image-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Mark as downloaded in cache if it has an ID (not a placeholder)
      if (imageData?.id && !imageData.isPlaceholder && markAsDownloaded) {
        markAsDownloaded(imageData.id);
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="rounded-xl overflow-hidden cursor-pointer relative group">
      <button
        onClick={handleDownload}
        className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-all duration-200 transform hover:scale-110 z-10"
        title="Download image"
      >
        <img src={downloadIcon} className="w-6 h-6" alt="Download" />
      </button>
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          alt="Generated artwork"
        />
        {/* Show download badge if image is downloaded */}
        {imageData?.downloaded && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Downloaded
          </div>
        )}
        {/* Show info overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="text-white text-sm">
            {imageData?.prompt && (
              <p className="truncate font-semibold">{imageData.prompt}</p>
            )}
            {imageData?.model && (
              <p className="text-xs opacity-80">Model: {imageData.model}</p>
            )}
            {imageData?.timestamp && (
              <p className="text-xs opacity-60">
                {new Date(imageData.timestamp).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
