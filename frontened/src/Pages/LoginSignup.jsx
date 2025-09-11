import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Handle input changes
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ============= LOGIN =============
  const login = async () => {
    console.log("Login function executed", formData);

    try {
      const response = await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.error || data.errors || "Login failed");
      }
    } catch (err) {
      console.error("🔥 Login Error:", err);
      alert("Server error during login");
    }
  };

  // ============= SIGNUP =============
  const signup = async () => {
    console.log("Signup function executed", formData);

    try {
      const response = await fetch("http://localhost:4001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.error || data.errors || "Signup failed");
      }
    } catch (err) {
      console.error("🔥 Signup Error:", err);
      alert("Server error during signup");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsinup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Enter Your Password"
            required
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms and privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
