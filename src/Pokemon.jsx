import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Tipos } from './Tipos';
import {
    normal,
    fire,
    water,
    electric,
    grass,
    ice,
    fighting,
    poison,
    ground,
    flying,
    psychic,
    bug,
    rock,
    ghost,
    dragon,
    dark,
    steel,
    fairy,
    shadow,
    light,
    cosmic
} from "./colors"

export const Pokemon = ({ pokemon }) => {
    const [dataTypes, setDataType] = useState([]);
    const [imagem, setImagem] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [status, setStatus] = useState([]);
    const [conversao, setConversao] = useState([]);
    const [valor, setValor] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [color, setColor] = useState({
        'normal': normal,
        'fire': fire,
        'water': water,
        'electric': electric,
        'grass': grass,
        'ice': ice,
        "fighting": fighting,
        "poison": poison,
        "ground": ground,
        "flying": flying,
        "psychic": psychic,
        "bug": bug,
        "rock": rock,
        "ghost": ghost,
        "dragon": dragon,
        "dark": dark,
        "steel": steel,
        "fairy": fairy,
        "shadow": shadow,
        "light": light,
        "cosmic": cosmic
    })

    useEffect(() => {
        if (pokemon) {
            getData(pokemon);
        }
    }, [pokemon]);

    const getData = (poke) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
            .then(response => {
                if (response.data) {
                    setDataType(response.data);
                    setHabilidades(response.data.abilities);
                    setStatus(response.data.stats);
                    setImagem(response.data.sprites.other.dream_world.front_default ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_default);
                    setValor(response.data.types);
                    setConversao(response.data.stats);
                    const tiposArray = response.data.types.map(typeInfo => typeInfo.type.name);
                    setTipos(tiposArray);
                    // console.log('tiposArray', tiposArray)
                } else {
                    setDataType([]);
                    setHabilidades([]);
                    setImagem([]);
                    setStatus([]);
                    setValor([]);
                    setTipos([]);
                }
            })
            .catch(error => {
                console.error(`Error fetching data for Pokemon ${poke}:`, error);
            });
    };

    return (
        <StyledContainer>
            <div style={{ width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", margin: "10px 0" }}>
                <H1 >{dataTypes.name}</H1>
                <img width={200} src={imagem} alt="Foto do Pokemon" />
            </div>
            <div style={{ width: '100%', display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0" }}>
                {tipos.map((tipo) => <span key={tipo} style={{ backgroundColor: color[tipo], width: tipos.length > 1 ? '50%' : '100%', display: 'flex', justifyContent: "center" }}>{tipo.replace("-", )}</span>)}
            </div>
            <div style={{ width: '100%', backgroundColor: "lightblue", display: "flex", flexDirection: "column", alignItems: "center", margin: "10px 0" }}>
                <span style={{ width: '100%', textAlign: "center", backgroundColor: "skyblue" }}>Ability's</span>
                {habilidades.map((ability) => (
                    <ul key={ability.ability.name}>
                        <li>{ability.ability.name}</li>
                    </ul>
                ))}
            </div>
            <div style={{ width: '100%', display: "flex", justifyContent: 'space-between' }}>
                <div style={{ width: '49%', backgroundColor: "lightblue", display: "flex", flexDirection: "column", alignItems: "center", margin: "10px 0" }}>
                    <span style={{ width: '100%', textAlign: "center", backgroundColor: "skyblue" }}>Status</span>
                    {status.map((stat) => (
                        <ul key={stat.stat.name}>
                            <li>{stat.stat.name}: {stat.base_stat}</li>
                        </ul>
                    ))}
                </div>
                <div style={{ width: '49%', backgroundColor: "lightblue", display: "flex", flexDirection: "column", alignItems: "center", margin: "10px 0" }}>
                    <span style={{ width: '100%', textAlign: "center", backgroundColor: "skyblue" }}>Conversão</span>
                    {conversao.length > 0 &&
                        <ul style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
                            <li>{conversao[0].stat.name}: {Math.round(conversao[0].base_stat / 2)}</li>
                            <li>{conversao[1].stat.name}: {Math.ceil(conversao[1].base_stat / 10)}</li>
                            <li>{conversao[2].stat.name}: {Math.ceil((conversao[2].base_stat / 10) + 10)}</li>
                            <li>{conversao[3].stat.name}: {Math.ceil(conversao[3].base_stat / 10)}</li>
                            <li>{conversao[4].stat.name}: {Math.ceil((conversao[4].base_stat / 10) + 10)}</li>
                            <li>{conversao[5].stat.name}: {Math.ceil(conversao[5].base_stat / 10)}</li>
                        </ul>
                    }
                </div>
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}
            >
                <h1 style={{ color: "black", textTransform: "capitalize" }}>Resistências</h1>
                {tipos.length > 0 && <Tipos tipos={tipos} />}
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    width: 100%;
    text-transform: capitalize;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* filter: drop-shadow(5px 5px 5px #000) */
`;

const H1 = styled.h1`
text-transform: capitalize; 
text-align: center;
width: 100%;
margin: 0 0 20px 0;
background-color: 
`