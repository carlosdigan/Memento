import styled from "styled-components";

export const StyledComment = styled.div`
  width: 300px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 25px;
  border: 1px solid black;
  .author {
    font-size: 15px;
    font-weight: bold;
    text-decoration: underline;
  }

  button {
    position: absolute;
    right: 10px;
    top: 5px;
  }
`;
