import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { fetchProfileData } from 'lib/apis/users/profile'

import { AuthContext } from 'App'

import { User } from 'types/user'
import { Recipe } from 'types/recipe'

import DefaultIcon from 'images/defaultIcon.png'
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
      <div className="bg-white border-2 border-brown p-2 pl-4 pb-4 pb-0 maxSm:text-center maxSm:pb-0">
        <div className="flex maxSm:block">
          {user?.profileImage ? (
            <img
              // レシピ画像が存在しないならデフォルト画像表示
              src={user?.profileImage.url ? user.profileImage.url : DefaultIcon}
              className="w-32 h-32 mt-4 maxSm:m-auto"
              alt="profileImage"
            />
          ) : (
            <></>
          )}

          <p className="relative top-12 left-8 max-w-xl mt-4 mr-auto text-2xl font-w6 maxSm:top-0 maxSm:left-0 maxSm:m-auto maxSm:mb-4  maxLg:max-w-sm">
            {user?.firstName} {user?.lastName}
          </p>

          {user?.id === currentUser?.id ? (
            <Link
              to="#"
              className="relative top-2 right-2 ml-auto w-40 h-12 px-4 pt-3 rounded whitespace-nowrap text-orange font-bold bg-brown maxSm:pb-4"
            >
              プロフィール編集
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="relative inline-flex text-lg font-w6 maxSm:bottom-0 maxSm:left-0 maxSm:my-8">
          <span className="mr-4">1 フォロー</span>
          <span>1 フォロワー</span>
        </div>
      </div>

      <div className="mt-8 bg-white border-2 border-brown p-4">
        <Tabs>
          <TabList>
            <Tab>マイレシピ</Tab>
            <Tab>お気に入り</Tab>
          </TabList>

          <TabPanel>
            <div className="mt-8 grid grid-cols-5 maxXl:grid-cols-4 maxMd:grid-cols-3 maxSm:grid-cols-2 gap-4">
              {userRecipes ? (
                userRecipes.map((recipe: Recipe) => (
                  <RecipeCards
                    key={recipe.id}
                    id={recipe.id}
                    recipeName={recipe.recipeName}
                    recipeImage={recipe.recipeImage}
                    recipeTime={recipe.recipeTime}
                    userId={recipe.userId}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8 grid grid-cols-5 maxXl:grid-cols-4 maxMd:grid-cols-3 maxSm:grid-cols-2 gap-4">
              {favoriteRecipes ? (
                favoriteRecipes.map((recipe: Recipe) => (
                  <RecipeCards
                    key={recipe.id}
                    id={recipe.id}
                    recipeName={recipe.recipeName}
                    recipeImage={recipe.recipeImage}
                    recipeTime={recipe.recipeTime}
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
