import React, { useState, useEffect } from 'react'

import { fetchTopData } from 'lib/apis/top'

import { Recipe } from 'types/recipe'

import RecipeCards from 'components/recipes/card'

const Top: React.FC = () => {
  const [recentRecipes, setRecentRecipes] = useState<Recipe[] | null>()
  const [fastestRecipes, setFastestRecipes] = useState<Recipe[] | null>()
  const [favoriteRankingRecipes, setFavoriteRankingRecipes] = useState<Recipe[] | null>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchTopData().then((data) => {
      setRecentRecipes(data.recentRecipes)
      setFastestRecipes(data.fastestRecipes)
      setFavoriteRankingRecipes(data.favoriteRankingRecipes)
    })
  }, [])

  return (
    <>
      {/* 人気のレシピ */}
      <p className="w-52 mb-4 py-2 text-center bg-darkRed rounded-full">
        <span className="font-bold text-orange">人気のレシピ トップ３</span>
      </p>
      <div className="grid grid-cols-5 maxXl:grid-cols-4 maxLg:grid-cols-3 maxSm:grid-cols-2 gap-4">
        {favoriteRankingRecipes ? (
          favoriteRankingRecipes.map((recipe: Recipe) => (
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

      {/* 早くできるレシピ */}
      <p className="w-52 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
        <span className="font-bold text-orange">早くできるレシピ トップ3</span>
      </p>
      <div className="grid grid-cols-5 maxXl:grid-cols-4 maxLg:grid-cols-3 maxSm:grid-cols-2 gap-4">
        {fastestRecipes ? (
          fastestRecipes.map((recipe: Recipe) => (
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

      {/* 最近追加したレシピ */}
      <p className="w-44 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
        <span className="font-bold text-orange">最近追加したレシピ</span>
      </p>
      <div className="grid grid-cols-6 maxXl:grid-cols-4 maxLg:grid-cols-3 maxSm:grid-cols-2 gap-4">
        {recentRecipes ? (
          recentRecipes.map((recipe: Recipe) => (
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
    </>
  )
}

export default Top
