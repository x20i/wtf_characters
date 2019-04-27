import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useAppActions, useAppState } from '../context'
import AnimButton from './AnimButton'

export default () => {
  const { showUI } = useAppActions()
  const { characters, steamID } = useAppState()

  function handleCharacterSelect(idx) {
    fetch('http://wtf_characters/selectCharacter', {
      method: 'POST',
      body: JSON.stringify({ steamID: steamID, idx }),
    }).then(r => showUI(false))
  }

  return (
    <Container>
      <h1>Select Character</h1>
      {characters.map(c => (
        <Character
          key={c.idx}
          {...c}
          onSelect={() => handleCharacterSelect(c.idx)}
        />
      ))}
      <Bottom>
        <Link to="/add_character">
          <AnimButton>
            <span>Add Character</span>
          </AnimButton>
        </Link>
      </Bottom>
    </Container>
  )
}

const Character = ({ idx, firstName, lastName, onSelect }) => (
  <AnimButton onClick={onSelect.bind(this, idx)}>
    <span>
      {firstName} {lastName}
    </span>
  </AnimButton>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  h1 {
    align-self: center;
  }
`

const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
