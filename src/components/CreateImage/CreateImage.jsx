import Headline from "./Headline";
import PromptBox from "./PromptBox";

export default function CreateImage() {
  return (
    <div className="flex justify-center flex-col">
      <Headline />
      <PromptBox />
    </div>
  );
}
