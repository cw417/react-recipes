import React from 'react'

export default function IngredientsList({ recipe, removeIngredient}) {

  function handleRemoveIngredient(recipeId, ingredientId) {
    console.log(`removing ${ingredientId} from ${recipeId}`)
    removeIngredient(recipeId, ingredientId)
  }
  
  return (
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
