import React, { useState, useEffect } from 'react'

import { fetchSearchRecipesData } from 'lib/apis/recipes/searchRecipes'

import { Recipe } from 'types/recipe'

import SelectItems from 'components/recipes/selectItems'
import RecipeCards from 'components/recipes/card'

const SearchRecipes: React.FC<any> = ({ match }) => {
  const [searchRecipes, setSearchRecipes] = useState<Recipe[] | null>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchSearchRecipesData(match.params.recipeName).then((data) => {
      setSearchRecipes(data.searchRecipes)
    })
  }, [match.params.recipeName])

  return (
    <div className="flex">
      <SelectItems />
      <div className="mx-auto">
        {match.params.recipeName === 'none' ? (
          <p className="text-center mb-6 text-4xl font-medium maxSm:text-3xl">「全て」の検索結果</p>
        ) : (
          <p className="text-center mb-6 text-4xl font-medium maxSm:text-3xl">
            「{match.params.recipeName}」の検索結果
          </p>
        )}
        <div className="grid grid-cols-5 maxXl:grid-cols-4 maxLg:grid-cols-2 gap-4">
          {searchRecipes ? (
            searchRecipes.map((recipe: Recipe) => (
              <RecipeCards
                key={recipe.id}
                id={recipe.id}
                recipeName={recipe.recipeName}
                recipeImage={recipe.recipeImage}
                recipeTime={recipe.recipeTime}
                forHowManyPeople={recipe.forHowManyPeople}
                createdAt={recipe.createdAt}
                updatedAt={recipe.updatedAt}
                userId={recipe.userId}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchRecipes
