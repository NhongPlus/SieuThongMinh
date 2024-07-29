import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRef } from "react";
import React from "react";
import styled from "styled-components";

const ContainerSearch = styled.div`
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgb(237, 237, 237) 0px 10px 10px;
`;

const Input = styled.input`
    border: none;
    outline: none;
    font-size: 20px;
    flex: 1 1 0%;
    padding-left: 10px;
    background-color: #fff;
`;

const Find = styled.div`
    background-color: rgb(255, 83, 80);
    height: 50px;
    width: 50px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: rgba(255, 83, 80, 0.533) 5px 5px 15px;
    color: white;
    font-size: 25px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function GetSearch({ inputValue, onInputChange }) {
    const text = useRef('');

    const handleInputChange = (e) => {
        onInputChange(e.target.value);
    };

    return (
        <ContainerSearch className="container__search">
            <Input 
                type="text" 
                placeholder="Search your Pokemon" 
                ref={text} 
                value={inputValue}
                onChange={handleInputChange} 
            />
            <Find>
                <FaMagnifyingGlass />
            </Find>
        </ContainerSearch>
    );
}

export default GetSearch;
