import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { atom } from "jotai";
import { useSetAtom } from "jotai/react";
import { MouseEventHandler, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledRegisterPage } from "./RegisterPage.style";

export const tokenAtom = atom<null | string>(null);

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate()
  const register = useMutation(
    (registerData: { email: string; username: string; password: string }) => {
      return axios.post("http://localhost:8080/register", registerData);
    }
  );
  const onRegister: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    register
      .mutateAsync({ email, username, password })
      .then((resp) => {
        localStorage.setItem("token", resp.data.token)
        navigate("/")
    });
  };

  return (
    <StyledRegisterPage>
      {register.isError && <Alert severity="error">Register failed!</Alert>}
      {register.isLoading && <CircularProgress />}
      <TextField
        placeholder="email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        placeholder="username"
        required={true}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        placeholder="password"
        required={true}
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button variant="contained" onClick={onRegister}>
        Register
      </Button>
    </StyledRegisterPage>
  );
}

export { RegisterPage };
