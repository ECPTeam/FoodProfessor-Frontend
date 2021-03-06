import { Link } from 'react-router-dom'

import { Recipe } from 'types/recipe'

import { DefaultRecipeImageUrl } from 'images/defaultRecipeImage'

const RecipeCard: React.FC<Recipe> = (props: Recipe) => {
  return (
    <div className="w-48 mx-auto maxSm:w-40">
      <Link to={`/recipes/${props.id}`}>
        {props.recipeImage ? (
          <img
            // レシピ画像が存在しないならデフォルト画像表示
            src={props.recipeImage.url ? props.recipeImage.url : DefaultRecipeImageUrl}
            className="mx-auto mb-2 border-2 border-orange hover:no-underline"
            alt="recipeImage"
          />
        ) : (
          <></>
        )}
        <p className="text-2xl text-center">{props.recipeName}</p>
      </Link>
    </div>
  )
}

export default RecipeCard
