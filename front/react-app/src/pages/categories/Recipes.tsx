import React, { useState, useEffect } from 'react'

import { fetchCategoryRecipesData } from 'lib/apis/categories/recipes'

import { Recipe } from 'types/recipe'

import SelectItems from 'components/recipes/selectItems'
import RecipeCards from 'components/recipes/card'

const CategoryRecipes: React.FC<any> = ({ match }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchCategoryRecipesData(match.params.categoryName).then((data) => {
      setRecipes(data.recipes)
    })
  }, [match.params.categoryName])

  return (
    <div className="flex">
      <SelectItems />
      <div className="mx-auto">
        <p className="text-center mb-6 text-4xl font-medium maxSm:text-3xl">「{match.params.categoryName}」のレシピ</p>
        <div className="grid grid-cols-5 maxXl:grid-cols-4 maxLg:grid-cols-2 gap-4">
          {recipes ? (
            recipes.map((recipe: Recipe) => (
              <RecipeCards
                key={recipe.id}
                id={recipe.id}
                recipeName={recipe.recipeName}
                recipeImage={recipe.recipeImage}
                recipeTime={recipe.recipeTime}
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

export default CategoryRecipes
