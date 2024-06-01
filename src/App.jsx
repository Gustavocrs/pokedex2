import { useState } from 'react'
import './globals.css'
import { Pokemon } from './Pokemon'
import styled from 'styled-components'

function App() {
  const [pokemon, setPokemon] = useState("")
  return (
    <div style={{ backgroundColor: 'lightgray', minHeight: '100vh', width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Input
        type="text"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value.toLocaleLowerCase())}
        placeholder="Digite o pokemon" />
      {pokemon && <Pokemon pokemon={pokemon} />}

    </div>
  )
}

export default App

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius:5px;
  border:none;
  text-align:center;
  padding: 20px 10px;
  margin: 20px;
  font-size:1.5rem;
  background-color: white;
`