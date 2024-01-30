import AllPost from "./pages/AllPost/AllPost";
import Auth from "./pages/Auth/Auth";
import CategoryPage from "./pages/Category/Category";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout/Layout";
import Post from "./pages/Post/Post";
import Review from "./pages/Review/Review";
import Upload from "./pages/Upload/Upload";
import User from "./pages/User/User";
export default [
  { path: "/", element: <Auth /> },
  {
    path: "/admin", element: <Layout />, children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "post", element: <Post /> },
      { path: "all-post", element: <AllPost /> },
      { path: "user", element: <User /> },
      { path: "review", element: <Review /> },
      { path: "category", element: <CategoryPage /> },
      { path: "upload", element: <Upload /> },
    ]
  },
];







