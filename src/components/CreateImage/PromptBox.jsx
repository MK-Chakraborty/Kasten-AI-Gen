export default function PromptBox() {
  return (
    <div className="flex justify-evenly py-1 px-1 border-4 border-[#26cefb] rounded-4xl mx-2">
      <input
        type="text"
        id="prompt"
        className="w-full p-2 rounded-full outline-none focus:ring-2 focus:ring-[#26cefb]"
        placeholder="Let's create something blazing"
      />
      <button className="btn btn-soft btn-info rounded-full p-2 ml-1 hover:bg-[#26cefb] hover:text-gray-800">
        ▶︎▶︎
      </button>
    </div>
  );
}
