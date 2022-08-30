import React from 'react'

export default function Sidebar({ recipes, filterRecipes }) {

  function handleFilterRecipes(id) {
    filterRecipes(id)
  }

  return (
    recipes.map((recipe, index) => {
      return (
        <div 
          key={index}
          className='py-2 px-2 hover:bg-blue-400 rounded-3xl'
          onClick={() => handleFilterRecipes(recipe.id)}
        >{recipe.name}</div>
      )
    })
  )
}
