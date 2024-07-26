import React from 'react';
import styled from 'styled-components';
import { replaceSpace } from "../../function/handleText";
import { typeColors } from "../../function/handleColor";

// Định nghĩa các styled component bên ngoài hàm GetItem
const PokemonCard = styled.div`
    flex: 0.5 1 0%;
    min-width: 20%;
    margin: 60px 0px 0px;
    position: relative;
    cursor: pointer;
    border: 2px solid white;
    transition-duration: 100ms;
    text-align: center;
    background-color: rgb(252, 252, 252);
    border-radius: 20px;
    box-shadow: rgb(237, 237, 237) 0px 10px 10px;
    padding: 15px 0;
    
    &:hover {
        border: 2px solid #E0E0E0;
    }

    &:hover img {
        transform: scale(1.2);
    }
`;

const PokemonDivImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PokeImage = styled.img`
    position: absolute;
    top: -55px;
    transition-duration: 100ms;
    image-rendering: pixelated;
`;

const PokemonTypes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PokemonId = styled.div`
    color: rgb(143, 147, 150);
    font-size: 13px;
    font-weight: bold;
`;

const PokemonName = styled.div`
    color: rgb(1, 16, 48);
    margin: 5px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
    font-size: 20px;
`;

const PokemonType = styled.span`
    border-radius: 5px;
    padding: 3px 7px;
    color: black;
    margin: 5px;
    margin-top: 10px;
    font-weight: 600;
    font-size: 14px;
    opacity: 0.8;
    text-transform: capitalize;
`;

function GetItem(props) {
    const { dataProps, types, id, setSelectedNumber } = props;

    function handleClick() {
        setSelectedNumber(id);
    }

    return (
        <PokemonCard onClick={handleClick}>
            {/* ảnh */}
            <PokemonDivImage>
                <PokeImage
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={dataProps}
                />
            </PokemonDivImage>
            {/* id */}
            <PokemonId>
                <span>N° {id}</span>
            </PokemonId>
            {/* tên */}
            <div>
                <PokemonName>{replaceSpace(dataProps)}</PokemonName>
            </div>
            {/* types */}
            <PokemonTypes>
                {types && types.map((type, typeIndex) => (
                    <PokemonType
                        key={typeIndex}
                        style={{ backgroundColor: typeColors[type.toLowerCase()] }}
                    >
                        {type}
                    </PokemonType>
                ))}
            </PokemonTypes>
        </PokemonCard>
    );
}

export default GetItem;
