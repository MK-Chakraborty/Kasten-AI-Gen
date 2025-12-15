import "./App.css";
import Page from "./components/Page";
import PollinationFetchProvider from "./provider/PollinationFetchProvider";
import RouterProvider from "./provider/RouterProvider";

function App() {
  return (
    <>
      <RouterProvider>
        <PollinationFetchProvider>
          <Page />
        </PollinationFetchProvider>
      </RouterProvider>
    </>
  );
}

export default App;
