import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.confirmPassword)) {
      alert("Please fill all fields.");
      return;
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Simulate user data
    const userData = {
      email: form.email,
      walletAddress: "0x123...abc",
      joined: "2024-01-01",
      nftsOwned: 0,
    };
    login(userData);
    navigate("/profile");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#222", borderRadius: 8, color: "#fff" }}>
      <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", margin: "8px 0", padding: 8 }}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          style={{ width: "100%", margin: "8px 0", padding: 8 }}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {!isLogin && (
          <input
            style={{ width: "100%", margin: "8px 0", padding: 8 }}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#7f00ff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            marginTop: 12,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <span
              style={{ color: "#7f00ff", cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              style={{ color: "#7f00ff", cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;