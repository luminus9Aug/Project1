import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import HomePage from "./Pages/Home/HomePage";
import AdminLogin from "./Pages/LoginPage/adminLogin";
import PrivateRoutes from "./Utility/PrivateRoutes";
import AdminRegister from "./Pages/Register/AdminRegister";
import CustomerRegister from "./Pages/Register/Customerregister";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerLogin from "./Pages/LoginPage/customerLogin";

const App: React.FC = () => {

  return (
    <Router>
      <AuthProvider>
        {" "}
        <Routes>
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/customer/Login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
