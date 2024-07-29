import React from "react";
import { replaceSpace , mapName ,ChangeText } from '../../function/handleText'
import { typeColors , ListMau} from '../../function/handleColor'
import styled from "styled-components";


const Description = styled.div`
    border-radius: 20px;
    width: 23%;
    text-align: center;
    border: 2px solid white;
    transition-duration: 100ms;
    background-color: #FFFFFF;
    box-shadow: rgb(237, 237, 237) 0px 10px 10px;
    position: fixed;
    z-index: 1;
    top: 70px;
    padding: 5px;
`
const DescriptionId = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #8F9396;
    margin-bottom: 0;
`
const DescriptionImage = styled.img`
    margin-top: -60px;
    height: 130px;
    image-rendering: pixelated;
    z-index: 2;
`
const DescriptionName = styled.h2`
  color: #011030;
  margin: 5px;
  text-align: center;
  text-transform: capitalize;
  font-size: 30px;
`
const DescriptionEntry = styled.div`
  padding: 0px 10px;
  color: #011030;
  margin: 5px 0;
  text-align: center;
`
const DescriptionEntryNoPoke = styled.img`
    margin-top: -100px;
`
const DescriptionEntryText = styled.div`
color: #8F9396;
`
const DescriptionTypeItem = styled.div`
    border-radius: 5px;
  padding: 3px 7px;
  color: black;
  margin: 5px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 14px;
  opacity: 0.8;
`
const DescriptionTypeList = styled.div`
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DescriptionStat = styled.div` 
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    justify-content: space-around;
`
const DescriptionStatBox = styled.div`
    background: #F6F8FC;
    padding: 5px;
    border-radius: 30px;
    margin: 5px;
`
const DescriptionStatBoxIndex = styled.div`
    font-size: 13.28px;
    font-weight: 600;
`
const DescriptionStatBoxTotal = styled.div`
    background: #88AAEA;
    padding: 5px;
    border-radius: 30px;
    margin: 5px;
    font-size: 13.28px;
    font-weight: 600;
`
const DescriptionStatBoxName = styled.div`
     border-radius: 50%;
  height: 25px;
  width: 25px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`
const DescriptionStatTotalLabel = styled.div`
    background-color: #7195DC;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
`
const DescriptionBmi = styled.div`
margin-top: 20px;
  display: flex;
`
const Title = styled.div`
font-size: 16px;
`
const DescriptionBmiSize = styled.div`
    width: 100%;
`
const DescriptionBmiBox = styled.div`
    background-color: #F6F8FC;
  padding: 8px 0;
  border-radius: 30px;
  margin: 5px;
`
const DescriptionAbilitiesBox = styled.div`
  border-radius: 30px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  `
const DescriptionAbilitiesBoxIgredient = styled.div`
  background-color: #F6F8FC;
  padding: 8px 0;
  border-radius: 30px;
  margin: 5px;
  width: 100%;
`
const DescriptionEvolution = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const DescriptionEvolutionLevel = styled.div`
    width: 50px;
    background-color: #F6F8FC;
    padding: 8px 0;
    border-radius: 30px;
    margin: 5px;
    font-size: 12px;
    font-weight: 600;
`
const DescriptionEvolutionItem = styled.div`
   display: flex;
  justify-content: center;
  align-items: center;
`
const DescriptionEvolutionImage = styled.img`
  height: 74px;
  width: 74px;
  cursor: pointer;
  border-radius: 30%;

  &:hover {
    background-color: #F6F8FC;
  }
`;
function GetDescription({  information, functionLink, functionId, level, moTa , TienHoa}) {
    return ( <>
         <Description>
            {information ? (
                <>
                    <DescriptionImage 
                        src={information.sprites.versions['generation-v']['black-white'].animated.front_default}
                        alt={information.name}
                    />
                    <DescriptionId>N°{information.id}</DescriptionId>
                    <DescriptionName>{replaceSpace(information.name)}</DescriptionName>
                    <DescriptionTypeList>
                        {information.types.map((typeInfo, index) => (
                            <DescriptionTypeItem
                                key={index}
                                style={{ backgroundColor: typeColors[typeInfo.type.name] }}
                            >
                                {replaceSpace(typeInfo.type.name)}
                            </DescriptionTypeItem>
                        ))}
                    </DescriptionTypeList>
                    <DescriptionEntry>
                        <Title>Pokedex Entry</Title>
                        <DescriptionEntryText>
                            {ChangeText(moTa?.flavor_text_entries.find((item) => item.language.name === 'en')?.flavor_text)}
                        </DescriptionEntryText>
                    </DescriptionEntry>
                    <div className='row center'>
                        <DescriptionBmi>
                            <DescriptionBmiSize className='width-100 column center margin-5'>
                                <Title>Height</Title>
                                <DescriptionBmiBox>{information.height / 10}m</DescriptionBmiBox>
                            </DescriptionBmiSize>
                            <DescriptionBmiSize className='width-100 column center margin-5'>
                                <Title>Weight</Title>
                                <DescriptionBmiBox>{information.weight / 10}kg</DescriptionBmiBox>
                            </DescriptionBmiSize>
                        </DescriptionBmi>
                    </div>
                    <div className='row center'>
                        <h4>Abilities</h4>
                        <div>
                            <DescriptionAbilitiesBox>
                                {information.abilities.slice(0, 2).map((item, index) => (
                                    <DescriptionAbilitiesBoxIgredient key={index}>
                                        {replaceSpace(item.ability.name)}
                                    </DescriptionAbilitiesBoxIgredient>
                                ))}
                            </DescriptionAbilitiesBox>
                        </div>
                    </div>
                    <div className='row center'>
                        <h4>Stats</h4>
                        <DescriptionStat>
                            {information.stats.map((statItem, index) => (
                                <DescriptionStatBox key={index}>
                                    <DescriptionStatBoxName style={{ backgroundColor: ListMau[statItem.stat.name] }} >
                                        {mapName(statItem.stat.name)}
                                    </DescriptionStatBoxName>
                                    <DescriptionStatBoxIndex>
                                        {statItem.base_stat}
                                    </DescriptionStatBoxIndex>
                                </DescriptionStatBox>
                            ))}
                            <DescriptionStatBoxTotal>
                                <DescriptionStatTotalLabel>TOT</DescriptionStatTotalLabel>
                                {information.stats.reduce((total, statItem) => total + statItem.base_stat, 0)}
                            </DescriptionStatBoxTotal>
                        </DescriptionStat>
                    </div>
                    <h4>Evolution</h4>
                    <div className='row center'>
                        <DescriptionEvolution>
                            {TienHoa.slice(0, 3).map((speciesUrl, index) => {
                                const speciesId = functionId(speciesUrl);
                                return (
                                    <DescriptionEvolutionItem key={index}>
                                        <DescriptionEvolutionImage
                                            onClick={() => functionLink(speciesUrl)}
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`}
                                            
                                        />
                                        {index < level.length && (
                                            <DescriptionEvolutionLevel>
                                                {level[index] !== '?' ? `Lv. ${level[index]}` : '?'}
                                            </DescriptionEvolutionLevel>
                                        )}
                                    </DescriptionEvolutionItem>
                                );
                            })}
                        </DescriptionEvolution>
                    </div>
                </>
            ) : (
                <DescriptionEntryNoPoke src='https://js-pokedex-virid.vercel.app/src/no-pokemon-selected-image.png' alt="No Pokemon selected" />
            )}
        </Description>
    </> );
}

export default GetDescription;