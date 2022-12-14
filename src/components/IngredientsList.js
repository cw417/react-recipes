import React from 'react'
import { FiMinus } from "react-icons/fi";

export default function IngredientsList({ recipe, removeIngredient, display }) {

  function handleRemoveIngredient(recipeId, ingredientId) {
    /**
     * Calls 'removeIngredient' to remove the igredient from the specified recipe based on id.
     * @param {String} recipeId      UUID of recipe.
     * @param {String} ingredientId  UUID of ingredient.
     */
    console.log(`removing ${ingredientId} from ${recipe.name}`)
    removeIngredient(recipeId, ingredientId)
  }
  
  return (
    // map each ingredient from 'ingredients' array to a div containing a remove button
    recipe.ingredients.map((ingredient, index) => {
      return (
        <div key={index}>
          <div className='flex flex-row'>
            <span>
              <button 
                className='btn'
                style={{display:display}}
                onClick={() => handleRemoveIngredient(recipe.id, ingredient.id)}
              ><FiMinus /></button>
            </span>
            <div className='w-1/6 mx-4 text-left'>{ingredient.amount}</div>
            <div className='inline-block align-middle'>{ingredient.name}</div>
          </div>
        </div>
      )
    })
  )
}
