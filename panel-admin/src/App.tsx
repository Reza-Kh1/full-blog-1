import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const route = useRoutes(routes);
  return (
    <>
      <div className="w-full min-h-screen flex bg-gray-800">
        {route}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
