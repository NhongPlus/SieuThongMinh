import React from "react";
import AllComponent from "./components/Father/allComponent";
import { FaAngleUp } from "react-icons/fa6";
import styled from "styled-components";
const ButtonUp = styled.button`
    background-color: white;
    box-shadow: #EDEDED 0 10px 10px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    z-index: 1;
`;

const App = () => {
  function backToTop(){
    window.scrollTo(0,0);
  }
  return (
    <div className="container">
      <AllComponent />
      <ButtonUp onClick={backToTop}>
        <FaAngleUp />
      </ButtonUp>
    </div>
  );
};

export default App;
