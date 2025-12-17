import { memo } from "react";
import downloadIcon from "../../assets/images/downloadIcon.png";
function CreatedImage({ imgSrc }) {
  const handleDownload = (e) => {
    e.stopPropagation(); // prevents parent click
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = "ai-image.png";
    link.click();
  };

  return (
    <div
      onClick={handleDownload}
      className="rounded-xl overflow-hidden cursor-pointer relative"
    >
      <img
        src={downloadIcon}
        className="w-10 absolute bottom-2 right-2"
        alt="download icon"
      />
      <img
        src={imgSrc}
        className="w-full h-48 object-cover"
        alt="AI Generated Image"
      />
    </div>
  );
}

export default memo(CreatedImage);
