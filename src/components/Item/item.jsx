import React, { useEffect, useState, useRef } from 'react';
import GetItem from '../../container/GetItem/getDataItem';
import styled from 'styled-components';
export const Dot = styled.div`
    margin-bottom: 10px;
`;

const ITEM_PER_PAGE = 20;


function Item(props) {
    const {setSelectedNumber , findPoke} = props;

    const urlPokemon = "https://pokeapi.co/api/v2/pokemon/?limit=898";
    const urlType = "https://pokeapi.co/api/v2/type";
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [savedPage, setSavedPage] = useState(0); // lưu trữ số trang đã render
    const [renderedData, setRenderedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const botRef = useRef(null);

    const fetchPokemonData = async () => {
        try {
            const res = await fetch(urlPokemon);
            const data = await res.json();
            return data.results;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const fetchPokemonTypes = async (pokemon) => {
        const pokemonWithType = [];

        for (let i = 1; i <= 18; i++) {
            const res = await fetch(`${urlType}/${i}`);
            const data = await res.json();
            const typeName = data.name;

            data.pokemon.forEach((p) => {
                const matchedPokemon = pokemon.find(
                    (pokemon) => pokemon.url === p.pokemon.url
                );
                if (matchedPokemon) {
                    const existingPokemon = pokemonWithType.find(
                        (p) => p.name === matchedPokemon.name
                    );
                    if (existingPokemon) {
                        existingPokemon.types.push(typeName);
                    } else {
                        pokemonWithType.push({
                            name: matchedPokemon.name,
                            url: matchedPokemon.url,
                            types: [typeName],
                        });
                    }
                }
            });
        }

        pokemonWithType.forEach((pokemon) => {
            const regex = /\/(\d+)\/$/;
            const match = pokemon.url.match(regex);
            if (match) {
                pokemon.order = parseInt(match[1]);
            }
        });
        pokemonWithType.sort((a, b) => a.order - b.order);

        setPokemonData(pokemonWithType);
        setRenderedData(pokemonWithType.slice(0, ITEM_PER_PAGE));
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const pokemon = await fetchPokemonData();
            await fetchPokemonTypes(pokemon);
            setIsLoading(false);
        };

        loadData();
    }, []);

    useEffect(() => {
        if (findPoke === '') {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isLoading) {
                            setCurrentPage((prevPage) => { // lưu cả 2 giá trị luôn 
                                const newPage = prevPage + 1;
                                setSavedPage(newPage);  // lưu vào setSavedPage 
                                return newPage; // lưu vào setCurrentPage luôn giá trị đó 
                            });
                        }
                    });
                },
                { threshold: 1.0 }
            );

            if (botRef.current) {
                observer.observe(botRef.current);
            }

            return () => {
                if (botRef.current) {
                    observer.unobserve(botRef.current);
                }
            };
        }

    }, [isLoading, findPoke]);

    useEffect(() => {
        if (currentPage > 0 && findPoke === '') {
            const newArr = [...renderedData, ...pokemonData.slice(currentPage * ITEM_PER_PAGE, (currentPage + 1) * ITEM_PER_PAGE)];
            setRenderedData(newArr);
        }
    }, [currentPage, findPoke]);

    useEffect(() => {
        if (findPoke !== '') { // nêu mà cái thanh ipnut nó có chữ
            const filteredData = pokemonData.filter((item) =>
                item.name.toLowerCase().includes(findPoke.toLowerCase())
            );
            setRenderedData(filteredData); // thì renderData sẽ truyền vào 1 mảng có những tên trùng
        } else {
            setRenderedData(pokemonData.slice(0, ITEM_PER_PAGE * (savedPage + 1)));
            // nếu mà thanh input rỗng thì cắt ròi +1 , vì ban đầu render ra 20 con nhưng page vẫn là 0
        }

    }, [findPoke, pokemonData]);


    return (
        <>
            <div className='row'>
                {renderedData?.map((element) => {
                    return element.name ? (
                        <div className="col-4" key={element?.order}>
                            <GetItem
                                dataProps={element?.name}
                                types={element?.types}
                                id={element?.order}
                                setSelectedNumber={setSelectedNumber}
                            />
                        </div>
                    ) : null;
                })}
                <Dot ref={botRef}></Dot>
            </div>
        </>
    );
}

export default Item;
