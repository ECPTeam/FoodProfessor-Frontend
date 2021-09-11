import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

type formStyleTypes = {
  formStyles: string
  closeBurgerMenu: () => void
}

const SearchForm: React.FC<formStyleTypes> = (props) => {
  const [recipeWard, setRecipeWard] = useState<string>('')

  const history = useHistory()

  const searchRecipes = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.closeBurgerMenu()

    if (recipeWard === '') {
      history.push(`/recipes/search/none`)
    } else {
      history.push(`/recipes/search/${recipeWard}`)
    }
    setRecipeWard('')
  }

  return (
    <form className={props.formStyles}>
      <div className="flex">
        <input
          type="text"
          value={recipeWard}
          className="w-60 h-8 px-2 rounded-l-sm border-t border-b border-l border-brown focus:outline-none"
          placeholder="レシピ名を入力"
          onChange={(event) => setRecipeWard(event.target.value)}
        />
        <button className="w-12 bg-lightGreen text-white rounded-r-sm" onClick={searchRecipes}>
          <i className="fas fa-search" />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
