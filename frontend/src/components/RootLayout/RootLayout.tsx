import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { StyledRootLayout } from "./RootLayout.style";

function RootLayout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <StyledRootLayout>
      <div id="nav">
        <Link to="/">
          <Button variant="contained">Home</Button>
        </Link>
        <Link to="/savedComments">
          <Button variant="contained">Saved comments</Button>
        </Link>
        {token == null ? (
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            variant="contained"
          >
            Logout
          </Button>
        )}
        {token == null && (
          <Link to="/register">
            <Button variant="contained">Register</Button>
          </Link>
        )}
      </div>
      <Outlet />
    </StyledRootLayout>
  );
}

export { RootLayout };
