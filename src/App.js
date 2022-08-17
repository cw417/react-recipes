import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import RecipeList from './components/RecipeList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [recipes, setRecipes] = useState([
    {id: uuidv4(), name: "Caprese salad", ingredients: [ 
      // ingredients stores objects with {id, name, amount} keys
      {id: uuidv4(), name: "Tomatoes", amount: "2, sliced"},
      {id: uuidv4(), name: "Mozzarella, fresh", amount: "4 slices"},
      {id: uuidv4(), name: "Basil, fresh", amount: "8 leaves"},
      {id: uuidv4(), name: "Olive oil", amount: "drizzle"},
      {id: uuidv4(), name: "Salt/pepper", amount: "to taste"},
      ], selected: false, editing: false},
    {id: uuidv4(), name: "Strawberry Banana Smoothie", ingredients: [ 
      {id: uuidv4(), name: "Bananas", amount: "2, peeled"},
      {id: uuidv4(), name: "Strawberries", amount: "1/2 C"},
      {id: uuidv4(), name: "Milk", amount: "6oz"},
      ], selected: false, editing: false},
  ])
  const [prevRecipes, setPrevRecipes] = useState([])
  const recipeNameRef = useRef()
  const searchRef = useRef()

  const LOCAL_STORAGE_KEY = 'recipeApp.recipes'

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedRecipes) setRecipes(storedRecipes)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  
  function handleAddRecipe() {
    const name = recipeNameRef.current.value
    if (name === '') return
    setRecipes(prev => {
      return [...prev, 
        { 
          id: uuidv4(), 
          name: name, 
          ingredients: [],
          selected: false,
          editing: false
        }
      ]
    })
    console.log(`added ${name} to recipes`)
    recipeNameRef.current.value = null
  }

  function removeRecipe(id) {
    const newRecipes = recipes.filter(recipe => recipe.id !== id)
    setPrevRecipes(recipes)
    setRecipes(newRecipes)
  }
  
  function handleClearAll() {
    setPrevRecipes(recipes)
    setRecipes([])
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13 || event.which === 13) {
      handleAddRecipe()
    }
  }

  function addIngredient(id, name, amount) {
    // used in RecipeInfo component
    const newRecipes = [...recipes]
    const recipe = newRecipes.find(recipe => recipe.id === id)
    const newIngredient = {id: uuidv4(), name: name, amount: amount}
    recipe.ingredients.push(newIngredient)
    setRecipes(newRecipes)
    console.log(`${newIngredient.name} added to ${recipe.name}`)
  }

  function removeIngredient(recipeId, ingredientId) {
    const newRecipes = [...recipes]
    const recipe = newRecipes.find(recipe => recipe.id === recipeId)
    recipe.ingredients = recipe.ingredients.filter(ingredient => ingredient.id !== ingredientId)
    setRecipes(newRecipes)
  }

  function searchIngredients(query, recipe) {
    setPrevRecipes(recipes)
    let found = false
    recipe.ingredients.forEach(ingredient => {
      console.log(`searching for ${query} in ${recipe.name}`)
      if (ingredient.name.toLowerCase().includes(query)) {
        found = true
      }
    })
    return found
  }

  function handleSearch() {
    const query = searchRef.current.value.toLowerCase()
    const searchResults = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query) || searchIngredients(query, recipe))
    setRecipes(searchResults)
    searchRef.current.value = null
  }

  function handleReturn() {
    // returns recipes list to previous state after search filter
    setRecipes(prevRecipes)
  }

  return (
    <>
      <div className='container--app'>
        <div className='container container--header'>
          <div className='container--header__title'>
            Recipes
          </div>
          
          <div className='container--header__addRecipe'>
            <input 
              placeholder='Recipe Name' 
              type='text'
              ref={recipeNameRef} 
              onKeyPress={handleKeyPress}
            />
            <span className='pad-left' >
              <button 
                onClick={handleAddRecipe}
              > Add</button>
            </span>
          </div>
          <div>
            <input type='text' placeholder='Search' ref={searchRef} />
            <span className='pad-left'>
              <button onClick={handleSearch}>Search</button>
            </span>
          </div>

          <div>
            <button onClick={handleReturn} >Return</button>
            <button onClick={handleClearAll}>Clear All</button>
          </div>
        </div>

        <div >
          <div className='container'>
            <RecipeList
              recipes={recipes}
              removeRecipe={removeRecipe}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
