import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import RecipeList from './components/RecipeList';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiSearch, FiRepeat, FiTrash2 } from "react-icons/fi";

const initialState = 
    [{
      id: uuidv4(), 
      name: "Caprese salad", 
      ingredients: [ 
        {id: uuidv4(), name: "Tomatoes", amount: "2, sliced"},
        {id: uuidv4(), name: "Mozzarella, fresh", amount: "4 slices"},
        {id: uuidv4(), name: "Basil, fresh", amount: "8 leaves"},
        {id: uuidv4(), name: "Olive oil", amount: "drizzle"},
        {id: uuidv4(), name: "Salt/pepper", amount: "to taste"},
      ], 
      instructions: [
        {id: uuidv4(), instruction: "Slice tomatoes and mozzarella. Add to bowl."},
        {id: uuidv4(), instruction: "Wash and chop the fresh basil, and add to bowl."},
        {id: uuidv4(), instruction: "Add a drizzle of olive oil, then salt, and pepper to taste."},
      ], 
      selected: false, 
      editing: false
    },
    {
      id: uuidv4(), 
      name: "Strawberry Banana Smoothie", 
      ingredients: [ 
        {id: uuidv4(), name: "Bananas", amount: "2, peeled"},
        {id: uuidv4(), name: "Strawberries", amount: "1/2 C"},
        {id: uuidv4(), name: "Milk", amount: "6oz"},
      ], 
      instructions: [
        {id: uuidv4(), instruction: "Peel bananas and add all ingredients to blender."},
        {id: uuidv4(), instruction: "Blend to desired consistency."},
        {id: uuidv4(), instruction: "If you would like to add protein powder, do so while blending."},
      ], 
      selected: false, 
      editing: false
    }]

function App() {
  
  /**
   * Recipes are objects with keys { id, name, ingredients, instructions, selected, false }.
   * Ingredients is an array of objects with keys { id, name, amount }.
   */
  const [recipes, setRecipes] = useState(initialState)
  const [prevRecipes, setPrevRecipes] = useState(recipes)
  const recipeNameRef = useRef()
  const searchRef = useRef()

  // local storage setup
  const LOCAL_STORAGE_KEY = 'recipeApp.recipes'

  // local storage setup
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedRecipes) setRecipes(storedRecipes)
  }, [])

  // local storage setup
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  
  function handleAddRecipe() {
    /**
     * Gets name ref, then creates/adds a new object to the 'recipes' array.
     */
    const name = recipeNameRef.current.value
    if (name === '') return // if name is blank, do not add anything to array
    setRecipes(prev => {
      return [...prev, 
        { 
          id: uuidv4(), 
          name: name, 
          ingredients: [],
          instructions: [],
          selected: false,
          editing: false
        }
      ]
    })
    console.log(`added ${name} to recipes`)
    recipeNameRef.current.value = null
  }

  function storeRecipes() {
    /**
     * Stores current 'recipes' array in 'prevRecipes' array.
     */
    console.log('storing current recipes array in prevRecipes')
    setPrevRecipes(recipes)
  }

  function restoreRecipes() {
    /**
     * Sets current 'recipes' array to 'prevRecipes' array.
     */
    console.log('restoring recipes array from prevRecipes')
    setRecipes(prevRecipes)
  }

  function removeRecipe(id) {
    /**
     * Removes 'recipe' from 'recipes' array based on id.
     * @param {String} id  UUID of recipe.
     * 
     */
    storeRecipes()
    const newRecipes = recipes.filter(recipe => recipe.id !== id)
    setRecipes(newRecipes)
  }
  
  function handleClearAll() {
    /**
     * Stores current 'recipes' array in 'prevRecipes', then clears it.
     */
    storeRecipes()
    console.log('clearing recipes array')
    setRecipes([])
  }

  function handleKeyPress(event) {
    /**
     * Calls 'handleAddRecipe' when 'Enter' key is pressed.
     * The keycode for 'Enter' is 13.
     * @param event  Keypress event watching for 'Enter' key.
     */
    if (event.keyCode === 13 || event.which === 13) {
      handleAddRecipe()
    }
  }

  function addIngredient(id, name, amount) {
    /**
     * Adds ingredient to 'ingredients' array for a given recipe id.
     * Used in the RecipeInfo component.
     * @param {String} id      UUID of recipe.
     * @param {String} name    Name of ingredient.
     * @param {String} amount  Amount of ingredient.
     */
    if (name === '') return
    const newRecipes = [...recipes]
    const recipe = newRecipes.find(recipe => recipe.id === id)
    const newIngredient = {id: uuidv4(), name: name, amount: amount}
    recipe.ingredients.push(newIngredient)
    setRecipes(newRecipes)
    console.log(`${newIngredient.name} added to ${recipe.name}`)
  }

  function removeIngredient(recipeId, ingredientId) {
    /**
     * Removes ingredient from recipe based on recipe id and ingredient id.
     * Used in the IngredientsList component.
     * @param {String} recipeId  UUID of recipe.
     * @param {String} ingredientId  UUID of ingredient.
     */
    const newRecipes = [...recipes]
    const recipe = newRecipes.find(recipe => recipe.id === recipeId)
    recipe.ingredients = recipe.ingredients.filter(ingredient => ingredient.id !== ingredientId)
    setRecipes(newRecipes)
  }

  function searchIngredients(query, recipe) {
    /**
     * Searches given 'recipe' object's 'ingredients' array for given query.
     * Matches are case insensitive.
     * @param  {String}  query   String to search for.
     * @param  {Object}  recipe  Recipe to search.
     * @return {Boolean}         True if ingredient name contains the given query string. 
     */
    let found = false
    recipe.ingredients.forEach(ingredient => {
      console.log(`searching for ${query} in ${recipe.name}`)
      if (ingredient.name.toLowerCase().includes(query)) {
        found = true
      }
    })
    return found
  }

  function addInstruction(id, instruction) {
    /**
     * Adds instruction to 'instructions' array for a given recipe id.
     * Used in the RecipeInfo component.
     * @param {String} id           UUID of recipe.
     * @param {String} instruction  instruction to add to 'instructions' array.
     */
    if (instruction === '') return
    const newRecipes = [...recipes]
    const recipe = newRecipes.find(recipe => recipe.id === id)
    const newInstruction = {id: uuidv4(), instruction: instruction}
    recipe.instructions.push(newInstruction)
    setRecipes(newRecipes)
    console.log(`${newInstruction.id} added to ${recipe.name}`)
  }

  function removeInstruction(recipeId, instructionId) {
    /**
     * Removes instruction from recipe based on recipe id and instruction id.
     * Used in the InstructionsList component.
     * @param {String} recipeId  UUID of recipe.
     * @param {String} instructionId  UUID of instruction.
     */
    const newRecipes = [...recipes]
    const recipe = newRecipes.find(recipe => recipe.id === recipeId)
    recipe.instructions = recipe.instructions.filter(instruction => instruction.id !== instructionId)
    setRecipes(newRecipes)
  }

  function handleSearch() {
    /**
     * Filters 'recipes' array based on matches from the 'searchRef' ref.
     * Calls 'searchIngredients' during filter.
     * Matches are case insensitive.
     * Sets 'recipes' array to filtered array.
     */
    storeRecipes()
    const query = searchRef.current.value.toLowerCase()
    const searchResults = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query) || searchIngredients(query, recipe))
    setRecipes(searchResults)
    searchRef.current.value = null
  }

  function handleRestore() {
    /**
     * Returns recipes list to previous state after search filter.
     */
    restoreRecipes()
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className='items-center'>
          <div className='text-5xl text-center m-8'>
            Recipes
          </div>

          <div>
            <div className='flex items-center'>
              <input placeholder='Recipe Name' type='text' ref={recipeNameRef} onKeyPress={handleKeyPress} />
              <span className='pad-left' >
                <button className='btn' onClick={handleAddRecipe}> <FiPlus /> </button>
              </span>
            </div>
            <div className='flex items-center'>
              <input type='text' placeholder='Search' ref={searchRef} />
              <span className='pad-left'>
                <button className='btn' onClick={handleSearch}><FiSearch /></button>
              </span>
            </div>
          </div>

          <div className='flex justify-center'>
            <button className='btn' onClick={handleRestore}><FiRepeat /></button>
            <button className='btn' onClick={handleClearAll}><FiTrash2 /></button>
          </div>
        </div>

        <div >
          <div className='m-4'>
            <RecipeList
              recipes={recipes}
              removeRecipe={removeRecipe}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              addInstruction={addInstruction}
              removeInstruction={removeInstruction}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
