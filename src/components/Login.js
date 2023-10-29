import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function decrypt(pt, key) {
    let ct = "";
    for (let c of pt) {
      if (c.match(/[a-zA-Z]/)) {
        let temp = key[c.toLowerCase()];
        if (c === c.toUpperCase()) {
          temp = temp.toUpperCase();
        }
        ct += temp;
      } else {
        ct += c;
      }
    }
    return ct;
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const key = "qwertyuioplkjhgfdsazxcvbnm";
  const mp = {};

  for (let i = 0; i < alphabet.length; i++) {
    mp[alphabet[i]] = key[i];
  }

  const plain = decrypt(password, mp);

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password: plain,
        })
        .then((res) => {
          if (res.data === "exist") {
            history("/home", { state: { id: email } });
          } else if (res.data === "notexist") {
            alert("User not found. Firstly, sign up.");
          } else if (res.data === "wrongpass") {
            alert("Wrong password..!");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <div>
          <input
            className="showPasswordDiv"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button
            className="showPassword"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
