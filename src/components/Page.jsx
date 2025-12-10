import { useContext } from "react";
import { RouterContext } from "../context";
import CreateImage from "./CreateImage/CreateImage";
import Downloaded from "./Downloaded";
import Footer from "./Footer";
import Header from "./Header/Header";
import Result from "./Result/Result";

export default function Page() {
  const { route } = useContext(RouterContext);

  return (
    <section className="font-[Orbitron] text-[#26cefb]">
      <div className="shadow-sm" id="Header-Part">
        <div className="max-w-7xl mx-auto">
          <Header />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {route === "createImage" ? (
          <div>
            <CreateImage />
            <Result />
          </div>
        ) : (
          <Downloaded />
        )}
      </div>
      <Footer />
    </section>
  );
}
