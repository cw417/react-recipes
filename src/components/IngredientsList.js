import React from 'react'

export default function IngredientsList({ recipe, removeIngredient}) {

  function handleRemoveIngredient(recipeId, ingredientId) {
    /**
     * Calls 'removeIngredient' to remove the igredient from the specified recipe based on id.
     * @param {String} recipeId      UUID of recipe.
     * @param {String} ingredientId  UUID of ingredient.
     */
    console.log(`removing ${ingredientId} from ${recipeId}`)
    removeIngredient(recipeId, ingredientId)
  }
  
  return (
    // map each ingredient from 'ingredients' array to a div containing a remove button
    recipe.ingredients.map((ingredient, index) => {
      return (
        <div key={index}>
          <div className='container--ingredients'>
            <span className='span--amount'>{ingredient.amount}</span>
            <span>{ingredient.name}</span>
            <span className='pad-left'>
              <button 
                onClick={() => handleRemoveIngredient(recipe.id, ingredient.id)}
              >-</button>
            </span>
          </div>
        </div>
      )
    })
  )
}
