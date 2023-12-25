import Home from "./components/Home";
import LoginUser from "./components/LoginUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from "./components/Register";

function App() {

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <LoginUser />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]);
  
  return (
    <div className="App">
      
      <RouterProvider router={router} />

      <ToastContainer />

    </div>
  );
}

export default App;
