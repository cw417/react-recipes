import React, { useState } from 'react'
import RecipeInfo from './RecipeInfo'

export default function Recipe({ recipe, removeRecipe, addIngredient, removeIngredient }) {

  const [ display, setDisplay ] = useState('none')
  
  function handleSelect() {
    if (display === 'none') {
      setDisplay('block')
      console.log('selected ' + recipe.name)
    } else {
      setDisplay('none')
      console.log('unselected ' + recipe.name)
    }
  }

  function handleRemoveRecipe() {
    removeRecipe(recipe.id)
    console.log(`removing ${recipe.name}`)
  }

  return (
    <div>
      <div>
        {recipe.name}
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
          />
        </div>
      </div>
      <br style={{display:display}} />
    </div>
  )
}
