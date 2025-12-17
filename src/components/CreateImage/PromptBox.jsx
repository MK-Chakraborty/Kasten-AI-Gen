import { useContext, useState } from "react";
import { PollinationFetchContext } from "../../context";

export default function PromptBox() {
  const [promptSettings, setPromptSettings] = useState({
    prompt: "",
    model: "flux",
    seed: 0,
    width: 1024,
    height: 1024,
  });

  const setAspectRatio = (widthRatio, heightRatio) => {
    if (promptSettings.width && promptSettings.height) {
      setPromptSettings({
        ...promptSettings,
        height: Math.round(promptSettings.width * (heightRatio / widthRatio)),
      });
    } else if (promptSettings.width && !promptSettings.height) {
      setPromptSettings({
        ...promptSettings,
        height: Math.round(promptSettings.width * (heightRatio / widthRatio)),
      });
    } else if (!promptSettings.width && promptSettings.height) {
      setPromptSettings({
        ...promptSettings,
        width: Math.round(promptSettings.height * (widthRatio / heightRatio)),
      });
    } else {
      if (widthRatio === 1)
        setPromptSettings({ ...promptSettings, width: 1024, height: 1024 });
      else if (widthRatio === 16)
        setPromptSettings({ ...promptSettings, width: 1280, height: 720 });
      else if (widthRatio === 4)
        setPromptSettings({ ...promptSettings, width: 1024, height: 768 });
      else if (widthRatio === 3)
        setPromptSettings({ ...promptSettings, width: 1500, height: 1000 });
    }
  };

  const { setPromptData, modelList } = useContext(PollinationFetchContext);

  const submitPrompt = (e) => {
    e.preventDefault();
    setPromptData({ ...promptSettings });
  };

  return (
    <form onSubmit={submitPrompt}>
      <div className="flex justify-evenly py-1 px-1 border-4 border-[#26cefb] rounded-4xl mx-2">
        <input
          onChange={(e) =>
            setPromptSettings({
              ...promptSettings,
              prompt: e.target.value,
            })
          }
          type="text"
          id="prompt"
          className="w-full p-2 rounded-full outline-none focus:ring-2 focus:ring-[#26cefb]"
          placeholder="Let's create something blazing"
          required
        />
        <button
          type="submit"
          className="btn btn-soft btn-info rounded-full p-2 ml-1 hover:bg-[#26cefb] hover:text-gray-800"
        >
          ▶︎▶︎
        </button>
      </div>
      <div className="my-10 border-2 rounded-xl mx-2 p-5">
        <p className="text-3xl mb-5">Advanced Settings</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="m-1">
            <label htmlFor="model">Model</label>
            <br />
            <select
              onChange={(e) =>
                setPromptSettings({ ...promptSettings, model: e.target.value })
              }
              id="model"
              className="w-full border-2 rounded-xl p-2 my-1"
            >
              {modelList.map((model, index) => (
                <option key={index} value={model} className="bg-gray-700">
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="m-1">
            <label htmlFor="seed">Seed (for reproducible results)</label>
            <br />
            <input
              onChange={(e) =>
                setPromptSettings({ ...promptSettings, seed: e.target.value })
              }
              type="text"
              id="seed"
              placeholder="Random (positive numbers)"
              pattern="^[1-9][0-9]*(\.[0-9]+)?$"
              className="w-full border-2 rounded-xl p-2 my-1"
            />
          </div>

          <div className="m-1">
            <label htmlFor="width">Width</label>
            <br />
            <input
              onChange={(e) =>
                setPromptSettings({ ...promptSettings, width: e.target.value })
              }
              type="number"
              id="width"
              value={promptSettings.width}
              min="1"
              className="w-full border-2 rounded-xl p-2 my-1"
            />
          </div>

          <div className="m-1">
            <label htmlFor="height">Height</label>
            <br />
            <input
              onChange={(e) =>
                setPromptSettings({ ...promptSettings, height: e.target.value })
              }
              type="number"
              id="height"
              value={promptSettings.height}
              min="1"
              className="w-full border-2 rounded-xl p-2 my-1"
            />
          </div>

          <div className="m-1">
            <label htmlFor="ratio">Aspect Ratio Presets</label>
            <br />
            <div className="flex gap-1 pt-1 items-center">
              <button
                type="button"
                onClick={() => setAspectRatio(1, 1)}
                className="btn btn-info btn-soft"
              >
                1:1
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio(16, 9)}
                className="btn btn-info btn-soft"
              >
                16:9
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio(4, 3)}
                className="btn btn-info btn-soft"
              >
                4:3
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio(3, 2)}
                className="btn btn-info btn-soft"
              >
                3:2
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
