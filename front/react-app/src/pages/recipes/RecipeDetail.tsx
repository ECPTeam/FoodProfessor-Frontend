import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'App'
import { Link, useHistory } from 'react-router-dom'

import { fetchRecipeData } from 'lib/apis/recipes/recipeDetail'
import { deleteRecipeData } from 'lib/apis/recipes/deleteRecipe'

import { User } from 'types/user'
import { Recipe } from 'types/recipe'
import { Ingredient } from 'types/ingredient'
import { Procedure } from 'types/procedure'
import { Category } from 'types/category'
import { Comment } from 'types/comment'

import { DefaultIconUrl } from 'images/defaultIcon'

import { DefaultRecipeImageUrl } from 'images/defaultRecipeImage'

import RecipeComments from 'components/comments/RecipeComments'
import FavoriteButton from 'components/favorites/FavoriteButton'

const RecipeDetail: React.FC<any> = ({ match }) => {
  const { currentUser, isLoggedIn } = useContext(AuthContext)

  const [recipe, setRecipe] = useState<Recipe | null>()
  const [user, setUser] = useState<User | null>()
  const [ingredients, setIngredients] = useState<Ingredient[] | null>([])
  const [procedures, setProcedures] = useState<Procedure[] | null>([])
  const [categories, setCategories] = useState<Category[] | null>([])
  const [comments, setComments] = useState<Comment[] | null>([])
  const [commentUsers, setCommentUsers] = useState<User[] | null>([])
  const [favoriteUsers, setFavoriteUsers] = useState<User[] | null>([])
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>()

  const history = useHistory()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchRecipeData(match.params.recipeId).then((data) => {
      setRecipe(data.recipe)
      setUser(data.user)
      setIngredients(data.ingredients)
      setProcedures(data.procedures)
      setCategories(data.categories)
      setComments(data.comments)
      setCommentUsers(data.commentUsers)
      setFavoriteUsers(data.favoriteUsers)
      setIsFavorite(data.isFavorite)
    })
  }, [])

  const deleteRecipe = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()

    if (isLoggedIn) {
      if (currentUser?.id !== recipe?.userId) return

      const check = confirm('削除しますか？')

      if (check) {
        try {
          const res = await deleteRecipeData(recipe?.id)

          if (res.status === 200) {
            history.push('/top')
          }
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      history.push('/login')
    }
  }

  return (
    <>
      {recipe ? (
        <div>
          <div className="grid grid-cols-2 maxMd:grid-cols-1 gap-4">
            <div>
              <p className="mb-6 text-darkRed text-4xl font-semibold">{recipe?.recipeName}</p>
              <div className="flex">
                <div className="h-8 mr-4 text-white bg-darkRed px-2 py-1">
                  <i className="fas fa-heart mr-3"></i>
                  {favoriteUsers?.length}
                </div>
                <div className="h-8 mr-4 text-white bg-darkRed px-2 py-1">
                  <i className="fa fa-comment mr-3"></i>
                  {comments?.length}
                </div>
                {user?.profileImage ? (
                  <Link to={`/users/${user.id}`} className="relative left-6 bottom-4">
                    <img
                      // レシピ画像が存在しないならデフォルト画像表示
                      src={user?.profileImage.url ? user.profileImage.url : DefaultIconUrl}
                      className="w-16 h-16 mr-auto maxSm:mx-auto rounded-full"
                      alt="profileImage"
                    />
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {recipe?.recipeImage ? (
                  <img
                    // レシピ画像が存在しないならデフォルト画像表示
                    src={recipe?.recipeImage.url ? recipe?.recipeImage.url : DefaultRecipeImageUrl}
                    className="max-w-md mt-2 mb-6 border-2 border-orange hover:no-underline maxLg:max-w-xs"
                    alt="recipeImage"
                  />
                ) : (
                  <></>
                )}
              </div>
              {isLoggedIn && isFavorite !== undefined ? (
                <FavoriteButton recipeId={recipe?.id} isFavorite={isFavorite} />
              ) : (
                <></>
              )}
              {isLoggedIn && recipe.userId === currentUser?.id ? (
                <span>
                  <Link to={`/recipes/${recipe.id}/edit`}>
                    <i className="fas fa-edit relative bottom-4 ml-8 mr-2"></i>
                  </Link>
                  <button onClick={deleteRecipe}>
                    <i className="fas fa-trash-alt relative bottom-4"></i>
                  </button>
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className="max-w-xl mb-6">
              <p className="w-20 mb-4 py-2 text-center bg-darkRed rounded-full">
                <span className="font-bold text-orange">材料</span>
              </p>
              <p className="text-orange text-2xl font-medium">{recipe.forHowManyPeople}人分</p>
              <hr className="text-brown my-4" />
              {ingredients ? (
                ingredients.map((ingredient: Ingredient, index: number) => (
                  <div key={index}>
                    <div className="px-4">
                      {ingredient.ingredientName} <span className="float-right">{ingredient.quantity}</span>
                    </div>
                    <hr className="text-brown my-4" />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <p className="w-32 mb-4 py-2 text-center bg-darkRed rounded-full">
            <span className="font-bold text-orange">作り方</span>
          </p>
          <p className="text-orange text-2xl font-medium mb-4">
            <i className="far fa-clock mr-2"></i>
            {recipe.recipeTime}分
          </p>
          {procedures ? (
            procedures.map((procedure: Procedure, index: number) => (
              <div key={index}>
                <div className="flex">
                  <span className="font-medium text-xl w-10">{index} , </span>
                  <span className="font-normal ml-4 text-md">{procedure.procedureContent}</span>
                </div>
                <hr className="text-brown my-4" />
              </div>
            ))
          ) : (
            <></>
          )}
          <div>
            {categories !== [] ? (
              <div>
                <p className="w-32 mt-8 py-2 text-center bg-darkRed rounded-full">
                  <span className="font-bold text-orange">カテゴリ</span>
                </p>
                {categories?.map((category: Category, index: number) => (
                  <div className="inline-block mt-6" key={index}>
                    <Link
                      to={`/categories/${category.categoryName}/recipes`}
                      className="whitespace-nowrap mr-4 px-4 py-2 font-bold text-darkRed text-center bg-white rounded-full border-2 border-darkRed hover:bg-darkRed hover:text-white"
                    >
                      {category.categoryName}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <p className="w-32 mt-8 mb-2 py-2 text-center bg-darkRed rounded-full">
            <span className="font-bold text-orange">コメント</span>
          </p>
          {comments !== [] ? (
            <RecipeComments recipeId={recipe?.id} comments={comments} commentUsers={commentUsers} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default RecipeDetail
