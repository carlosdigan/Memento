import { Button } from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import { useAtomValue } from "jotai";
import { queryClient } from "../../App";

import { Comment as CommentType } from "../../types";
import { StyledComment } from "./Comment.style";

interface Props {
  comment: CommentType;
  showSave: boolean;
}

function Comment({ comment, showSave }: Props) {
  const saveComment = useMutation(
    (saveCommentData: { commentId: number; saveComment: boolean }) => {
      return axios.post("http://localhost:8080/saveComment", saveCommentData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  return (
    <StyledComment>
      <div className="author">{comment.author.username}</div>
      <div className="text">{comment.text}</div>
      {showSave && (
        <Button
          onClick={() =>
            saveComment.mutate({
              commentId: comment.id,
              saveComment: !comment.saved,
            })
          }
          variant={comment.saved ? "contained" : "outlined"}
        >
          {comment.saved ? "Saved" : "Save"}
        </Button>
      )}
    </StyledComment>
  );
}

export { Comment };
