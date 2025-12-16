import { WordWithDefinition } from '@/types'
import React from 'react'

function Card({word}:{word:WordWithDefinition}) {

 
  return (
    <div style={{'border':'solid'}}>
      <p> word: {word.word}</p>
      <p> Rank: {word.rank}</p>
      <p> Translation: {word.definitions[0].text}</p>
      
      </div>
  )
}

export default Card