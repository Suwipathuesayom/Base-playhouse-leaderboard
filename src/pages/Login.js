import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextInput } from "../assets/styles/InputStyles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../assets/styles/login.css";
import color from "../constant/color";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const handleLogin = async (event, email, password) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setHasError(false);
          navigate("/admin-leaderboard", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          setHasError(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="login__container">
        <Typography
          variant="h2"
          color={"#FF5B4A"}
          fontFamily={"Russo One"}
          fontSize={40}
        >
          LEADERBOARD
        </Typography>
        <Typography
          variant="p"
          color={"#FF5B4A"}
          fontFamily={"Russo One"}
          fontSize={24}
        >
          ADMIN
        </Typography>
        <TextInput
          width={"80%"}
          sx={{ height: "50px" }}
          marginright={0}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={"email"}
        />
        <TextInput
          type="password"
          width={"80%"}
          sx={{ height: "50px" }}
          marginright={0}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={"password"}
        />
        {hasError && (
          <Typography variant="p" fontSize={18} color="error">
            Incorrect email or password
          </Typography>
        )}
        <Button
          variant="contained"
          fontSize={32}
          sx={{
            width: "80%",
            height: "50px",
            fontSize: 20,
            backgroundColor: color.primaryOrange,
            ":hover": {
              backgroundColor: "#f18888",
            },
          }}
          onClick={(event) => handleLogin(event, email, password)}
        >
          Login
        </Button>
        <p
          onClick={() => {
            navigate(-1);
          }}
        >
          ย้อนกลับ
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
