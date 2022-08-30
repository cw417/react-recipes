import React from 'react'

export default function SidebarList({ recipes, prevRecipes, filterRecipes }) {
  
  let filtered = false

  function handleFilterRecipes(id) {
    filterRecipes(id)
    toggleFiltered()
  }

  function toggleFiltered() {
    console.log(`filtered: ${filtered}`)
    filtered = !filtered
  }

    return (
      prevRecipes.map((recipe, index) => {
        return (
          <div key={index}>
            <div 
              className='py-2 px-2 hover:bg-blue-400 rounded-3xl'
              onClick={() => handleFilterRecipes(recipe.id)}
            >{recipe.name}</div>
          </div>
        )
      })
    )
}
