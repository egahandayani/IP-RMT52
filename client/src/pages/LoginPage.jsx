import { useEffect, useState } from "react";
import ipApi from "../helpers/http-client";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (el) => {
    el.preventDefault();

    try {
      const { data } = await ipApi.post("/login", {
        email,
        password,
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("userId", data.id);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User login successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data.message || "Something went wrong! ",
      });
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const { data } = await ipApi.post("/login/google", {
      googleToken: response.credential,
    });

    localStorage.setItem("access_token", data.access_token);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User login successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } 
    );
    window.google.accounts.id.prompt();
  }, []);
  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit} className="w-50 m-auto border rounded p-5">
        <h1 className="text-center"> Login Page </h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            //form input binding
            value={email}
            onChange={(el) => setEmail(el.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            //form input binding
            value={password}
            onChange={(el) => setPassword(el.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
        <div>
          <br />
          <p>
            {" "}
            Don&apos;t have an account yet?{" "}
            <Link to="/register"> Register </Link>{" "}
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3 flex-column align-items-center">
          <div>Or</div>
          <div id="buttonDiv"></div>
        </div>
      </form>
    </div>
  );
}
