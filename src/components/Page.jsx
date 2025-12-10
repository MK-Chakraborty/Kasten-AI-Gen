import CreateImage from "./CreateImage/CreateImage";
import Footer from "./Footer";
import Header from "./Header/Header";
import Result from "./Result/Result";

export default function Page() {
  return (
    <section className="font-[Orbitron] text-[#26cefb]">
      <div className="shadow-sm" id="Header-Part">
        <div className="max-w-7xl mx-auto">
          <Header />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <CreateImage />
        <Result />
      </div>
      <Footer />
    </section>
  );
}
