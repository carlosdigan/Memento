import CircularProgress from "@mui/material/CircularProgress";
import { Comment as CommentType } from "../../types";
import { Comment } from "../Comment/Comment";
import { useQuery } from "react-query";
import axios from "axios";
import { StyledComments } from "./Comments.style";

import { useAtomValue } from "jotai";

function Comments() {
  const fetchComments = async (): Promise<CommentType[]> => {
    const resp = await axios.get("http://localhost:8080/comments", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const comments = resp.data;
    return comments;
  };

  const { isLoading, data: comments = [] } = useQuery<CommentType[]>(
    "comments",
    fetchComments
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <StyledComments>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} showSave={true} />
      ))}
    </StyledComments>
  );
}

export { Comments };
