import React from 'react'
import SidebarList from './SidebarList';
import { FiRepeat } from "react-icons/fi";

export default function Sidebar({ sidebarRecipes, filterRecipes, restoreRecipes }) {

  function handleRestoreRecipes() {
    restoreRecipes()
  }

  return (
        <div >
          <div>
            <button className='btn' onClick={handleRestoreRecipes}><FiRepeat /></button>
          </div>
          <SidebarList
            sidebarRecipes={sidebarRecipes}
            filterRecipes={filterRecipes}
          />
        </div>
  )
}
