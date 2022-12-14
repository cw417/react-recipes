import React from 'react'
import Recipe from './Recipe'

export default function RecipeList({ recipes, removeRecipe, addIngredient, removeIngredient, addInstruction, removeInstruction, toggleEditing }) 
  {
  return (
    // map each recipe from the 'recipes' array to a Recipe component.
    recipes.map(recipe => {
      return (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          removeRecipe={removeRecipe}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          addInstruction={addInstruction}
          removeInstruction={removeInstruction}
          toggleEditing={toggleEditing}
        />
      )
    })
  )
}
