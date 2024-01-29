import Auth from "./pages/Auth/Auth";
import CategoryPage from "./pages/Category/Category";
import Dashboard from "./pages/Dashboard/Dashboard";
export default [
  { path: "/", element: <Auth /> },
  { path: "/dashboard", element: <Dashboard /> },
//   { path: "/category", element: <CategoryPage /> },
];
