import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { fetchProfileData } from 'lib/apis/users/profile'

import { AuthContext } from 'App'

import { User } from 'types/user'
import { Recipe } from 'types/recipe'

import { DefaultIconUrl } from 'images/defaultIcon'

import RecipeCards from 'components/recipes/card'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const Profile: React.FC<any> = ({ match }) => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User | null>()
  const [userRecipes, setUserRecipes] = useState<Recipe[] | null>()
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[] | null>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchProfileData(match.params.userId).then((data) => {
      setUser(data.user)
      setUserRecipes(data.recipes)
      setFavoriteRecipes(data.favoriteRecipes)
    })
  }, [])

  return (
    <>
      <div className="bg-white border-2 border-brown p-2 pl-4 pb-4 pb-0 maxSm:text-center maxSm:pb-12">
        <div className="flex maxSm:block">
          {user?.profileImage ? (
            <img
              // レシピ画像が存在しないならデフォルト画像表示
              src={user?.profileImage.url ? user.profileImage.url : DefaultIconUrl}
              className="w-32 h-32 my-4 ml-8 maxSm:mx-auto rounded-full"
              alt="profileImage"
            />
          ) : (
            <></>
          )}

          <p className="relative top-12 left-8 max-w-xl mt-4 mr-auto text-2xl maxSm:top-0 maxSm:left-0 maxSm:m-auto maxSm:mb-4  maxLg:max-w-sm">
            {user?.firstName} {user?.lastName}
          </p>

          {user?.id === currentUser?.id ? (
            <Link
              to={`/users/${currentUser?.id}/edit`}
              className="relative top-2 right-2 ml-auto w-40 h-12 px-4 pt-3 rounded whitespace-nowrap text-orange font-bold bg-brown maxSm:pb-4"
            >
              プロフィール編集
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white border-2 border-brown p-4 maxSm:p-2">
        <Tabs>
          <TabList>
            <Tab>マイレシピ</Tab>
            <Tab>お気に入り</Tab>
          </TabList>

          <TabPanel>
            <div className="mt-8 grid grid-cols-5 maxXl:grid-cols-4 maxLg:grid-cols-3 maxMd:grid-cols-2 gap-4 maxSm:gap-2">
              {userRecipes ? (
                userRecipes.map((recipe: Recipe) => (
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
          </TabPanel>
          <TabPanel>
            <div className="mt-8 grid grid-cols-5 maxXl:grid-cols-4 maxLg:grid-cols-3 maxMd:grid-cols-2 gap-4">
              {favoriteRecipes ? (
                favoriteRecipes.map((recipe: Recipe) => (
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
          </TabPanel>
        </Tabs>
      </div>
    </>
  )
}

export default Profile
