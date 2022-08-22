import React, { useState } from 'react'
import RecipeInfo from './RecipeInfo'

export default function Recipe({ recipe, removeRecipe, addIngredient, removeIngredient, addInstruction, removeInstruction }) {

  const [ display, setDisplay ] = useState('none')
  const [ fontSize, setFontSize ] = useState('1em')
  
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
      setFontSize('1em')
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
    <div>
      <div> 
        <span style={{fontSize:fontSize}}>
          {recipe.name}
        </span>
        <span className='pad-left'>
          <input type='checkbox' onClick={handleSelect} />
        </span>
        <span className='pad-left'>
          <button onClick={handleRemoveRecipe}>x</button>
        </span>
        <div style={{display:display}}>
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
