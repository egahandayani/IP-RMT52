import { useState } from "react";
import ipApi from "../helpers/http-client";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (el) => {
    el.preventDefault();

    try {
      await ipApi.post("/register", {
        username,
        email,
        password,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data.message || "Something went wrong! ",
      });
    }
  };
  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit} className="w-50 m-auto border rounded p-5">
        <h1 className="text-center"> Register Page </h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            //form input binding
            value={username}
            onChange={(el) => setUsername(el.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            //form input binding
            value={email}
            onChange={(el) => setEmail(el.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            //form input binding
            value={password}
            onChange={(el) => setPassword(el.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <div>
          <br />
          <p>
            {" "}
            Do you have an account? <Link to="/login"> Login </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
