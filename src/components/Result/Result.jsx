import image1 from "../../assets/images/ai-image-1.jpeg";
import image2 from "../../assets/images/ai-image-2.jpeg";
import {
  default as image3,
  default as image7,
} from "../../assets/images/ai-image-3.jpeg";
import {
  default as image4,
  default as image8,
} from "../../assets/images/ai-image-4.jpeg";
import {
  default as image5,
  default as image9,
} from "../../assets/images/ai-image-5.jpeg";
import {
  default as image10,
  default as image6,
} from "../../assets/images/ai-image-6.jpeg";
import CreatedImage from "./CreatedImages";

export default function Result() {
  const imgArray = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image10,
    image7,
    image8,
    image9,
  ];
  return (
    <section className="mx-2">
      <p className="text-2xl my-8">Your creations can truly be amazing!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {imgArray.map((img, index) => (
          <CreatedImage key={index} imgSrc={img} />
        ))}
      </div>
    </section>
  );
}
