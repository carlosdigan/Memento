import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Comment as CommentType } from "../../types";
import { Comment } from "../../components/Comment/Comment";
import { StyledSavedComments } from "./SavedComments.style";
import { useEffect } from "react";

function SavedComments() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const fetchSavedComments = async () => {
    const resp = await axios.get("http://localhost:8080/savedComments", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return resp.data;
  };

  const { isLoading, data: savedComments = [] } = useQuery<CommentType[]>(
    "savedComments",
    fetchSavedComments
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  console.log("Saved comments", savedComments);

  return (
    <StyledSavedComments>
      {savedComments.map((savedComment) => (
        <Comment comment={savedComment} showSave={false} />
      ))}
    </StyledSavedComments>
  );
}

export { SavedComments };
