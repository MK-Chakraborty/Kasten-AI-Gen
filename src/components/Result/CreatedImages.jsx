import downloadIcon from "../../assets/images/downloadIcon.png";
export default function CreatedImage({ imgSrc }) {
  return (
    <div className="rounded-xl overflow-hidden cursor-pointer relative">
      <img
        src={downloadIcon}
        className="w-10 absolute bottom-2 right-2"
        alt=""
      />
      <img src={imgSrc} className="w-full h-48 object-cover" alt="" />
    </div>
  );
}
