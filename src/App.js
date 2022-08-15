import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [recipes, setRecipes] = useState([])
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

  function handleKeyPress(event) {
    if (event.keyCode === 13 || event.which === 13) {
      handleAddRecipe()
    }
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

        </div>
      </div>
    </>
  );
}

export default App;
