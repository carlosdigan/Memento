import styled from "styled-components";

export const StyledRootLayout = styled.div`
  width: 50%;
  min-height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  background-color: #80808052;
  padding: 25px;
  position: relative;

  #nav {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    right: 20px;
  }

  #nav > a > button {
    width: 100%;
  }
`;
