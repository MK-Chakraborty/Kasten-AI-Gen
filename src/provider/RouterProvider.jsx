import { useState } from "react";
import { RouterContext } from "../context";

export default function RouterProvider({ children }) {
  const [route, setRoute] = useState("createImage");
  return (
    <RouterContext.Provider value={{ route, setRoute }}>
      {children}
    </RouterContext.Provider>
  );
}
