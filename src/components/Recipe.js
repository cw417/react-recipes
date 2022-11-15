import React, { useState } from 'react'
import RecipeInfo from './RecipeInfo'
import { FiX } from "react-icons/fi";

export default function Recipe({ recipe, removeRecipe, addIngredient, removeIngredient, addInstruction, removeInstruction, toggleEditing }) {

  const [ display, setDisplay ] = useState('none')
  
  function handleSelect() {
    /**
     * Toggles display of the RecipeInfo component on/off.
     */
    if (display === 'none') {
      setDisplay('block')
      console.log('selected ' + recipe.name)
    } else {
      setDisplay('none')
      console.log('unselected ' + recipe.name)
    }
  }

  function handleRemoveRecipe() {
    /**
     * Calls 'removeRecipe' to remove the recipe from 'recipes' array based on id.
     */
    removeRecipe(recipe.id)
    console.log(`removing ${recipe.name}`)
  }

  return (
    <div className='my-6 cust-shadow rounded-xl p-8'>
      <div>
        <div className='flex flex-row items-center'>
          <span className='pad-left'>
            <input className='chkbx' type='checkbox' onClick={handleSelect} />
          </span>
          <span className='text-2xl'>
            {recipe.name}
          </span>
          <span className='right'>
            <button className='btn ' onClick={handleRemoveRecipe}><FiX /></button>
          </span>
        </div>
        <div 
          className=''
          style={{display:display}}
        >
          <RecipeInfo
            recipe={recipe} 
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            addInstruction={addInstruction}
            removeInstruction={removeInstruction}
            toggleEditing={toggleEditing}
          />
        </div>
      </div>
      <br style={{display:display}} />
    </div>
  )
}
