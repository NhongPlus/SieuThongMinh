import React, { useEffect, useState } from 'react';
import GetDescription from '../../container/GetDescription/getDataDescription';


function Description(props) {
    const { selectedNumber } = props;
    const [infor, setInfor] = useState(null);
    const [des, setDes] = useState(null);
    const [level, setLevel] = useState(null);
    const [evolution, setEvolution] = useState([]);

    const getUrlList = (chain) => {
        const speciesList = [];
        const traverseEvolutionChain = (chain) => {
            const species = chain.species.url;
            speciesList.push(species);
            if (chain.evolves_to && chain.evolves_to.length > 0) {
                chain.evolves_to.forEach(evolution => {
                    traverseEvolutionChain(evolution);
                });
            }
        };
        traverseEvolutionChain(chain);
        return speciesList;
    };
    const getLevelList = (chain) => {
        const levelList = [];
        const traverseEvolutionChain = (chain) => {
            if (chain.evolution_details && chain.evolution_details.length > 0) {
                chain.evolution_details.forEach(detail => {
                    if (detail.min_level === null) {
                        levelList.push('?');
                    }
                    else {
                        levelList.push(detail.min_level)
                    }
                });
            }
            if (chain.evolves_to && chain.evolves_to.length > 0) {
                chain.evolves_to.forEach(evolution => {
                    traverseEvolutionChain(evolution);
                });
            }
        };
        traverseEvolutionChain(chain);
        return levelList;
    };

    useEffect(() => {
        const fetchEvo = async (evoChainId) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evoChainId}`);
                const jsonData = await response.json();
                setLevel(getLevelList(jsonData.chain));
                setEvolution(getUrlList(jsonData.chain));

            } catch (error) {
                console.error('Error fetching evolution data:', error);
            }
        };
        const fetchText = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedNumber}`);
                const json = await res.json();
                console.log(json);
                setDes(json);
                const evoChainUrl = json.evolution_chain.url;
                const evoChainId = evoChainUrl.split('/').filter(Boolean).pop();
                fetchEvo(evoChainId);
            } catch (error) {
                console.error('Error fetching species data:', error);
            }
        };

        if (selectedNumber) {
            fetchText();
        }
    }, [selectedNumber]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedNumber}`);
                const jsonData = await response.json();
                setInfor(jsonData);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        if (selectedNumber) {
            fetchData();
        }
    }, [selectedNumber]);

    async function handleLink(url) {
        try {
            const response = await fetch(url); // fecth 1 lần
            const data = await response.json();
            const finalLink = await fetch(data.varieties[0].pokemon.url); // lần 2 lấy ra https://pokeapi.co/api/v2/pokemon
            const susces = await finalLink.json();
            setInfor(susces);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        console.log(evolution);
    }
    const extractIdFromUrl = (url) => {
        const parts = url.split('/').filter(Boolean);
        return parts[parts.length - 1];
    };
    return (
        <GetDescription
            information={infor}
            functionLink={handleLink}
            functionId={extractIdFromUrl}
            level={level}
            moTa={des}
            TienHoa={evolution}
        />
    );
}

export default Description;