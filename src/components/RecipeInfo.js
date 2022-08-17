import React, { useState, useRef} from 'react'
import IngredientsList from './IngredientsList'

export default function RecipeInfo({ recipe, addIngredient, removeIngredient }) {

  const [ display, setDisplay ] = useState('none')
  const ingredientName = useRef()
  const ingredientAmount = useRef()
  
  function handleEdit() {
    /**
     * Toggles display of the 'add ingredient' element on/off.
     */
    if (display === 'none') {
      setDisplay('block')
      console.log('editing ingredients for ' + recipe.name)
    } else {
      setDisplay('none')
      console.log('finished editing ingredients for ' + recipe.name)
      ingredientName.current.value = null
      ingredientAmount.current.value = null
    }

  }

  function handleAddIngredient() {
    /**
     * Calls 'addIngredient' to add a new ingredient object to the 'ingredients' array for a given recipe id.
     */
    const name = ingredientName.current.value
    const amount = ingredientAmount.current.value
    console.log( `adding ${amount} ${name} to ${recipe.name}`)
    addIngredient(recipe.id, name, amount)
    ingredientName.current.value = null
    ingredientAmount.current.value = null
  }

  function handleKeyPress(event) {
    /**
     * Calls 'handleAddIngredient' when 'Enter' key is pressed.
     * The keycode for 'Enter' is 13.
     * @param event  Keypress event watching for 'Enter' key.
     */
    if (event.keyCode === 13 || event.which === 13) {
      handleAddIngredient()
    }
  }

  return (
  <>
    <button onClick={handleEdit} >Edit</button>
    <IngredientsList 
      recipe={recipe}
      removeIngredient={removeIngredient}
    />
    <div style={{display:display}}>
      <input 
        className='input--ingredientAmount' 
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
      <button onClick={handleAddIngredient}>+</button>
    </div>
  </>
  )
}
