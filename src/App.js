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
  
  return (
    <div className="App">
      Recipe App
    </div>
  );
}

export default App;
