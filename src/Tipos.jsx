import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water } from './colors';

export const Tipos = ({ tipos }) => {
    const [vantagens, setVantagens] = useState({});

    useEffect(() => {
        const typeAdvantages = {
            normal: { fighting: 2, ghost: 0 },
            fighting: { flying: 2, rock: 0.5, bug: 0.5, psychic: 2, dark: 0.5, fairy: 2 },
            flying: { fighting: 0.5, ground: 0, rock: 2, bug: 0.5, grass: 0.5, electric: 2, ice: 2 },
            poison: { fighting: 0.5, poison: 0.5, ground: 2, bug: 0.5, grass: 0.5, psychic: 2, fairy: 0.5 },
            ground: { poison: 0.5, rock: 0.5, water: 2, grass: 2, electric: 0, ice: 2 },
            rock: { normal: 0.5, fighting: 2, flying: 0.5, poison: 0.5, ground: 2, steel: 2, fire: 0.5, water: 2, grass: 2 },
            bug: { fighting: 0.5, flying: 2, ground: 0.5, rock: 2, fire: 2, grass: 0.5 },
            ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
            steel: { normal: 0.5, fighting: 2, flying: 0.5, poison: 0, ground: 2, rock: 0.5, bug: 0.5, steel: 0.5, fire: 2, grass: 0.5, psychic: 0.5, ice: 0.5, dragon: 0.5, fairy: 0.5 },
            fire: { ground: 2, rock: 2, bug: 0.5, steel: 0.5, water: 2, grass: 0.5, ice: 0.5, fairy: 0.5 },
            water: { steel: 0.5, fire: 0.5, grass: 2, electric: 2, ice: 0.5 },
            grass: { flying: 2, poison: 2, ground: 0.5, bug: 2, fire: 2, water: 0.5, electric: 0.5, ice: 2 },
            electric: { flying: 0.5, ground: 2, steel: 0.5 },
            psychic: { fighting: 0.5, bug: 2, ghost: 2, psychic: 0.5, dark: 2 },
            ice: { fighting: 2, rock: 2, steel: 2, fire: 2 },
            dragon: { fire: 0.5, water: 0.5, grass: 0.5, electric: 0.5, ice: 2, dragon: 2, fairy: 2 },
            dark: { fighting: 2, bug: 2, ghost: 0.5, psychic: 0, fairy: 2 },
            fairy: { fighting: 0.5, poison: 2, bug: 0.5, steel: 2, dragon: 0, dark: 0.5 }
        };

        let tempVantagens = {};

        tipos.forEach(type => {
            const typeAdvantage = typeAdvantages[type];
            Object.keys(typeAdvantage).forEach(defType => {
                if (!tempVantagens[defType]) {
                    tempVantagens[defType] = 1;
                }
                const advantage = typeAdvantage[defType];
                tempVantagens[defType] *= advantage;
            });
        });

        setVantagens(tempVantagens);
    }, [tipos]);

    const getBubbleValue = (value) => {
        switch (value) {
            case 0:
                return '0'; // Nenhum dano
            case 0.25:
                return '¼'; // Valor reduzido por 4 vezes
            case 0.5:
                return '½'; // Valor reduzido por 2 vezes
            case 1:
                return '1'; // Valor neutro
            case 2:
                return '2'; // Valor dobrado
            case 4:
                return '3'; // Valor quadruplicado
            default:
                return value.toString(); // Valor padrão quando não houver correspondência
        }
    };

    const Bubble = ({ color, type }) => {
        const vantagem = vantagens[type] !== undefined ? vantagens[type] : 1;
        const bubbleValue = getBubbleValue(vantagem);

        return (
            <Container color={color}>
                <span>{type}</span>
                <span>{bubbleValue}</span>
            </Container>
        );
    };

    return (
        <StyledContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Bubble color={normal} type="normal" />
                <Bubble color={fire} type="fire" />
                <Bubble color={water} type="water" />
                <Bubble color={electric} type="electric" />
                <Bubble color={grass} type="grass" />
                <Bubble color={ice} type="ice" />
                <Bubble color={fighting} type="fighting" />
                <Bubble color={poison} type="poison" />
                <Bubble color={ground} type="ground" />
                <Bubble color={flying} type="flying" />
                <Bubble color={psychic} type="psychic" />
                <Bubble color={bug} type="bug" />
                <Bubble color={rock} type="rock" />
                <Bubble color={ghost} type="ghost" />
                <Bubble color={dragon} type="dragon" />
                <Bubble color={dark} type="dark" />
                <Bubble color={steel} type="steel" />
                <Bubble color={fairy} type="fairy" />
            </div>
        </StyledContainer>
    );
};

const Container = styled.div`
    background-color: ${props => props.color || 'grey'};
    border-radius: 5px;
    padding: 2px;
    margin: 3px;
    color: black;
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 70px;
    flex-grow:1;
    height: 50px;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
