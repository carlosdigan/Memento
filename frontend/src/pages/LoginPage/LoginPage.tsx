import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledLoginPage } from "./LoginPage.style";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useMutation(
    (loginData: { email: string; password: string }) => {
      return axios.post("http://localhost:8080/login", loginData);
    }
  );
  const onLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    login.mutateAsync({ email, password }).then((resp) => {
      localStorage.setItem("token", resp.data.token);
      navigate("/");
    });
  };

  return (
    <StyledLoginPage id="login">
      {login.isError && <Alert severity="error">Login failed!</Alert>}
      {login.isLoading && <CircularProgress />}
      <TextField
        placeholder="email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        placeholder="password"
        required={true}
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
    </StyledLoginPage>
  );
}

export { LoginPage };
