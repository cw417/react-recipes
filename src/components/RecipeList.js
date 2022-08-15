import React from 'react'
import Recipe from './Recipe'

export default function RecipeList({ recipes, removeRecipe }) {
  return (
    recipes.map(recipe => {
      return (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          removeRecipe={removeRecipe}
        />
      )
    })
  )
}
