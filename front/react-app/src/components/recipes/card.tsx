import { Link } from 'react-router-dom'

import { Recipe } from 'types/recipe'

import defaultRecipeImage from 'images/defaultRecipe.png'

const RecipeCard: React.FC<Recipe> = (props: Recipe) => {
  return (
    <div>
      <Link to="#">
        {props.recipeImage ? (
          <img
            // レシピ画像が存在しないならデフォルト画像表示
            src={props.recipeImage.url ? props.recipeImage.url : defaultRecipeImage}
            className="max-w-48 max-h-48 mr-auto ml-auto mb-2 border-2 border-orange hover:no-underline"
            alt="recipeImage"
          />
        ) : (
          <></>
        )}
        <p className="text-2xl font-w6 text-center">{props.recipeName}</p>
      </Link>
    </div>
  )
}

export default RecipeCard
