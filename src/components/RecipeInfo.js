import React, { useState, useRef} from 'react'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import { FiEdit2 } from "react-icons/fi";

export default function RecipeInfo({ recipe, addIngredient, removeIngredient, addInstruction, removeInstruction }) {

  const [ display, setDisplay ] = useState('none')
  const ingredientName = useRef()
  const ingredientAmount = useRef()
  const instructionInfo = useRef()
  
  function handleEdit() {
    /**
     * Toggles display of the 'add ingredient/instruction' elements on/off.
     */
    if (display === 'none') {
      setDisplay('block')
      console.log('editing ' + recipe.name)
    } else {
      setDisplay('none')
      console.log('finished editing ' + recipe.name)
      ingredientName.current.value = null
      ingredientAmount.current.value = null
      instructionInfo.current.value = null
    }

  }

  function handleAddIngredient() {
    /**
     * Calls 'addIngredient' to add a new ingredient object to the 'ingredients' array for a given recipe id.
     */
    const name = ingredientName.current.value
    const amount = ingredientAmount.current.value
    if (name === '') return
    console.log( `adding ingredient '${amount} ${name}' to ${recipe.name}`)
    addIngredient(recipe.id, name, amount)
    ingredientName.current.value = null
    ingredientAmount.current.value = null
  }

  function handleAddInstruction() {
    const info = instructionInfo.current.value
    console.log(`adding instruction '${info}' to ${recipe.name}`)
    addInstruction(recipe.id, info)
    instructionInfo.current.value = null
  }

  function handleKeyPress(event) {
    /**
     * Calls 'handleAddIngredient' when 'Enter' key is pressed.
     * The keycode for 'Enter' is 13.
     * @param event  Keypress event watching for 'Enter' key.
     */
    if (event.keyCode === 13 || event.which === 13) {
      handleAddIngredient()
      handleAddInstruction()
    }
  }

  return (
  <>
    <button className='btn' onClick={handleEdit}><FiEdit2 /></button>
    <div className='text-2xl my-2'>Ingredients</div>
    <IngredientsList 
      recipe={recipe}
      removeIngredient={removeIngredient}
    />
    <br />
    <div className='text-2xl my-2'>Instructions</div>
    <InstructionsList 
      recipe={recipe}
      addInstruction={addInstruction}
      removeInstruction={removeInstruction}
    />
    <div style={{display:display}}>
      <input 
        className='mr-2 w-20' 
        type='text' 
        placeholder='Amt'
        ref={ingredientAmount} 
        onKeyPress={handleKeyPress}
      />
      <input 
        type='text' 
        placeholder='Ingredient'
        ref={ingredientName} 
        onKeyPress={handleKeyPress}
      />
      <button className='btn' onClick={handleAddIngredient}>+</button>
    </div>
    <div style={{display:display}}>
      <input
        type='text'
        placeholder='Instruction'
        ref={instructionInfo}
        onKeyPress={handleKeyPress}
      />
      <button className='btn' onClick={handleAddInstruction}>+</button>
    </div>
  </>
  )
}
