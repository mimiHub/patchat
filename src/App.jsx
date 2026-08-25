import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import Layout from "./layouts/Layout";

function App() {
  const pageElement = useRoutes(routes);
  return <Layout>{pageElement}</Layout>;
}

export default App;
