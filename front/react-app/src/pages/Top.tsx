import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { fetchTopData } from 'lib/apis/top'

import { Recipe } from 'types/recipe'
import { Ingredient } from 'types/ingredient'

import RecipeCards from 'components/recipes/card'

const Top: React.FC = () => {
  const [recentRecipes, setRecentRecipes] = useState<Recipe[] | null>()
  const [fastestRecipes, setFastestRecipes] = useState<Recipe[] | null>()
  const [ingredients, setIngredients] = useState<Ingredient[] | null>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchTopData().then((data) => {
      setRecentRecipes(data.recentRecipes)
      setFastestRecipes(data.fastestRecipes)
      setIngredients(data.ingredients)
    })
  }, [])

  return (
    <>
      {/* 最近追加したレシピ */}
      <p className="w-44 mb-4 py-2 text-center bg-darkRed rounded-full">
        <span className="font-bold text-orange">最近追加したレシピ</span>
      </p>

      <div className="grid grid-cols-5 maxXl:grid-cols-4 maxMd:grid-cols-3 maxSm:grid-cols-2 gap-4">
        {recentRecipes ? (
          recentRecipes.map((recipe: Recipe) => (
            <RecipeCards
              key={recipe.id}
              id={recipe.id}
              recipeName={recipe.recipeName}
              recipeImage={recipe.recipeImage}
              recipeTime={recipe.recipeTime}
              userId={recipe.userId}
              folderId={recipe.folderId}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      {/* 早くできる料理 */}
      <p className="w-52 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
        <span className="font-bold text-orange">早くできる料理 トップ3</span>
      </p>

      <div className="grid grid-cols-5 maxXl:grid-cols-4 maxMd:grid-cols-3 maxSm:grid-cols-2 gap-4">
        {fastestRecipes ? (
          fastestRecipes.map((recipe: Recipe) => (
            <RecipeCards
              key={recipe.id}
              id={recipe.id}
              recipeName={recipe.recipeName}
              recipeImage={recipe.recipeImage}
              recipeTime={recipe.recipeTime}
              userId={recipe.userId}
              folderId={recipe.folderId}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      {/* 食材一覧 */}
      <p className="w-40 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
        <span className="font-bold text-orange">食材一覧</span>
      </p>

      <div>
        {ingredients ? (
          ingredients.map((ingredient: Ingredient) => (
            <Link to="#" key={ingredient.id} className="font-w6 mb-1 block">
              {ingredient.ingredientName}
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default Top
