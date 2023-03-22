import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { StyledCreateComment } from "./CreateComment.style";
import { useAtomValue } from "jotai";

import { queryClient } from "../../App";

function CreateComment() {
  const comment = useMutation(
    (commentData: { text: string }) => {
      return axios.post("http://localhost:8080/comment", commentData, {
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
  const [text, setState] = useState("");
  return (
    <StyledCreateComment>
      <TextField
        fullWidth={true}
        variant="standard"
        multiline={true}
        placeholder="Write a comment"
        onChange={(e) => setState(e.target.value)}
      ></TextField>
      <Button
        onClick={() => {
          if (text) {
            comment.mutate({ text });
          }
        }}
        variant="outlined"
      >
        Publish
      </Button>
    </StyledCreateComment>
  );
}

export { CreateComment };
