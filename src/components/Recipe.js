import React, { useState } from 'react'
import RecipeInfo from './RecipeInfo'
import { FiX } from "react-icons/fi";

export default function Recipe({ recipe, removeRecipe, addIngredient, removeIngredient, addInstruction, removeInstruction }) {

  const [ display, setDisplay ] = useState('none')
  const [ fontSize, setFontSize ] = useState('1.5em')
  
  function handleSelect() {
    /**
     * Toggles display of the RecipeInfo component on/off.
     */
    if (display === 'none') {
      setDisplay('block')
      setFontSize('2em')
      console.log('selected ' + recipe.name)
    } else {
      setDisplay('none')
      setFontSize('1.5em')
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
    <div className='m-2'>
      <div> 
        <span className='' style={{fontSize:fontSize}}>
          {recipe.name}
        </span>
        <span className='pad-left'>
          <input className='chkbx' type='checkbox' onClick={handleSelect} />
        </span>
        <span className='pad-left'>
          <button className='btn' onClick={handleRemoveRecipe}><FiX /></button>
        </span>
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
          />
        </div>
      </div>
      <br style={{display:display}} />
    </div>
  )
}
