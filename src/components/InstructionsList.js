import React from 'react'
import { FiMinus } from "react-icons/fi";

export default function InstructionsList({ recipe, removeInstruction, display }) {

  // set counter for numbering of instructions
  let count = 0;

  function handleRemoveInstruction(recipeId, instructionId) {
    console.log(`removing ${instructionId} from ${recipe.name}`)
    removeInstruction(recipeId, instructionId)
  }

  return (
    recipe.instructions.map((instruction, index) => {
      count++;
      return (
        <div key={index} className='flex flex-row'>
          <button 
            className='btn'
            style={{display:display}}
            onClick={() => handleRemoveInstruction(recipe.id, instruction.id)}
          ><FiMinus /></button>
          <span className='mx-4'>{count}. {instruction.instruction}</span>
        </div>
      )
    })
  )
}
