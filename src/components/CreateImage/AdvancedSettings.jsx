export default function AdvancedSettings() {
  return (
    <div className="my-10 border-2 rounded-xl mx-2 p-5">
      <p className="text-3xl mb-5">Advanced Settings</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="m-1">
          <label htmlFor="model">Model</label>
          <br />
          <select
            name=""
            id="model"
            className="w-full border-2 rounded-xl p-2 my-1"
          >
            <option value="" className="bg-gray-700">
              Flux
            </option>
            <option value="" className="bg-gray-700">
              Turbo
            </option>
          </select>
        </div>

        <div className="m-1">
          <label htmlFor="seed">Seed (for reproducible results)</label>
          <br />
          <input
            type="text"
            id="seed"
            placeholder="Random"
            className="w-full border-2 rounded-xl p-2 my-1"
          />
        </div>

        <div className="m-1">
          <label htmlFor="width">Width</label>
          <br />
          <input
            type="number"
            id="width"
            value="1024"
            className="w-full border-2 rounded-xl p-2 my-1"
          />
        </div>

        <div className="m-1">
          <label htmlFor="height">Height</label>
          <br />
          <input
            type="number"
            id="height"
            value="1024"
            className="w-full border-2 rounded-xl p-2 my-1"
          />
        </div>

        <div className="m-1">
          <label htmlFor="ratio">Aspect Ratio Presets</label>
          <br />
          <div className="flex gap-1 pt-1 items-center">
            <button className="btn btn-info btn-soft">1:1</button>
            <button className="btn btn-info btn-soft">16:9</button>
            <button className="btn btn-info btn-soft">4:3</button>
            <button className="btn btn-info btn-soft">3:2</button>
          </div>
        </div>
      </div>
    </div>
  );
}
