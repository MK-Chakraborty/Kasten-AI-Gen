import "./App.css";
import Page from "./components/Page";
import RouterProvider from "./provider/RouterProvider";

function App() {
  return (
    <>
      <RouterProvider>
        <Page />
      </RouterProvider>
    </>
  );
}

export default App;
