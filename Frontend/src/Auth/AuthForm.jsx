import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthForm = () => {

  const navigate = useNavigate();


  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Separate submit for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("LOGIN DATA:", {
      email: formData.email,
      password: formData.password
    });
    axios.post('${import.meta.env.VITE_BACKEND_URL}/api/login/user', {
      email: formData.email,
      password: formData.password
    }, { withCredentials: true })
      .then(res => {
        console.log("Success", res.data);
        navigate("/profile");
      })
      .catch(err => console.log("Error: ", err));
  };

  // Separate submit for register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("REGISTER DATA:", formData);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register/user`, { ...formData })
      .then(res => {
        console.log("Success: ", res.data);
      })
      .catch(err => {
        console.log("Error: ", err);

      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 pb-2 text-lg font-medium ${activeTab === "login"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 pb-2 text-lg font-medium ${activeTab === "register"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Conditional Forms with separate submit handlers */}
        {activeTab === "login" ? (
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleLoginSubmit}
          />
        ) : (
          <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleRegisterSubmit}
          />
        )}

        {/* Extra Links */}
        {activeTab === "login" && (
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setActiveTab("register")}
            >
              Register here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
