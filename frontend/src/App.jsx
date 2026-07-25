import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import ScrollToTop from "./components/ScrollToTop";
import BlogEditor from "./pages/BlogEditor";
import AdminBlogs from "./pages/AdminBlogs";
import BlogPostReader from "./pages/BlogPostReader";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPostReader />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminBlogs />} />
            <Route path="/admin/editor" element={<BlogEditor />} />
            <Route path="/admin/editor/:id" element={<BlogEditor />} />
          </Route>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
