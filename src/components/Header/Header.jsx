import Logo from "./Logo";
import Route from "./Route";

export default function Header() {
  return (
    <div className="bg-base-100 flex lg:justify-between md:justify-between justify-center items-center flex-wrap mb-2 py-4">
      <Logo />
      <Route />
    </div>
  );
}
