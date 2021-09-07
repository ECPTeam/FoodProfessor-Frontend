import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import { unFavoriteRecipeUrl } from 'urls/index'

export const unFavoriteRecipeData = (recipeId: number | undefined, currentUserId: number | undefined): AxiosPromise => {
  return client.delete(unFavoriteRecipeUrl(recipeId, currentUserId))
}
