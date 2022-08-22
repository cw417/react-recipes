import React from 'react'

export default function InstructionsList({ recipe }) {
  let count = 0;
  return (
    recipe.instructions.map(instruction => {
      count++;
      return (
        <div>{count}. {instruction.instruction}</div>
      )
    })
  )
}
