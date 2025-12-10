import Logo from "./Logo";
import Route from "./Route";

export default function Header() {
  return (
    <div className="bg-base-100 flex lg:justify-between md:justify-between justify-center items-center flex-wrap my-2">
      <Logo />
      <Route />
    </div>
  );
}
