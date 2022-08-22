import React from 'react'

export default function InstructionsList({ recipe }) {
  let count = 0;
  return (
    recipe.instructions.map((instruction, index) => {
      count++;
      return (
        <div key={index}>{count}. {instruction.instruction}</div>
      )
    })
  )
}
