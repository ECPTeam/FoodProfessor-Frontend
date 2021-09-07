import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { favoriteRecipeData } from 'lib/apis/favorites/favorite'
import { unFavoriteRecipeData } from 'lib/apis/favorites/unfavorite'

import { AuthContext } from 'App'

type propsType = {
  recipeId: number | undefined
  isFavorite: boolean | undefined
}

const CommentForm: React.FC<propsType> = (props) => {
  const history = useHistory()

  const { currentUser, isLoggedIn } = useContext(AuthContext)

  const [isFavoriteByUser, setIsFavoriteByUser] = useState<boolean | undefined>()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(() => {
    setIsFavoriteByUser(props.isFavorite)
  }, [])

  const changeIsFavorite = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setIsDisabled(true)
    if (isFavoriteByUser) {
      unFavorite()
    } else {
      favorite()
    }
  }

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append('recipeId', String(props.recipeId))
    formData.append('currentUserId', String(currentUser?.id))

    return formData
  }

  const favorite = async () => {
    if (isLoggedIn) {
      const params = createFormData()

      try {
        const res = await favoriteRecipeData(params)

        if (res.status === 200) {
          history.go(0) // ハートの切り替えができないためためページをリロード
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      history.push('/login')
    }
    setIsDisabled(false)
  }

  const unFavorite = async () => {
    if (isLoggedIn) {
      try {
        const res = await unFavoriteRecipeData(props.recipeId, currentUser?.id)

        if (res.status === 200) {
          history.go(0) // ハートの切り替えができないためためページをリロード
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      history.push('/login')
    }
    setIsDisabled(false)
  }

  return (
    <>
      {isFavoriteByUser !== undefined ? (
        <button className="relative bottom-4" onClick={changeIsFavorite} disabled={isDisabled}>
          <i className={isFavoriteByUser ? 'fas fa-heart text-red' : 'fas fa-heart'}></i>
        </button>
      ) : (
        <></>
      )}
    </>
  )
}

export default CommentForm
