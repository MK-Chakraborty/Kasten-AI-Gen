import { useContext } from "react";
import { RouterContext } from "../../context";

export default function Route() {
  const { setRoute } = useContext(RouterContext);
  return (
    <ul className="menu menu-horizontal px-1 text-xl">
      <li onClick={() => setRoute("createImage")}>
        <a>Create Image</a>
      </li>
      <li onClick={() => setRoute("downloaded")}>
        <a>Downloaded</a>
      </li>
    </ul>
  );
}
