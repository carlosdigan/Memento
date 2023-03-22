import { useAtomValue } from "jotai/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { CreateComment } from "../../components/CreateComment/CreateComment";

import { StyledHomePage } from "./HomePage.style";

function HomePage() {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <StyledHomePage>
      <CreateComment />
      <Comments />
    </StyledHomePage>
  );
}

export { HomePage };
