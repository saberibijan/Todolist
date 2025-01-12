import routes from "./routes";
import "./App.css";
import { useRoutes } from "react-router-dom";


function App() {

  let router = useRoutes(routes)

  return (
    <>
    {router}
    </>
  );
}

export default App;
