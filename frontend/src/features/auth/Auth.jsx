import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

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
    navigate("/home");
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
      <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid #333" }} />
        <span style={{ margin: "0 12px", color: "#888" }}>or</span>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid #333" }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            // You get credentialResponse.credential (JWT)
            // You can send it to your backend or decode it here
            // For demo, just log it:
            console.log(credentialResponse);
            // You can call login() here if you want to treat Google login as authenticated
          }}
          onError={() => {
            alert("Google Login Failed");
          }}
          width="100%"
          theme="filled_black"
          text="continue_with"
          shape="rectangular"
        />
      </div>
      <button
        style={{
          width: "100%",
          background: "#181A20",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: 8,
          padding: "12px 0",
          marginBottom: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: 20, height: 20 }} />
        Continue with Apple
      </button>
      <button
        style={{
          width: "100%",
          background: "#181A20",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: 8,
          padding: "12px 0",
          marginBottom: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" style={{ width: 20, height: 20 }} />
        Continue with Telegram
      </button>
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