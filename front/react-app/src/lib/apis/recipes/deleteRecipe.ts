import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import { deleteRecipeUrl } from 'urls/index'

export const deleteRecipeData = (recipeId: number | undefined): AxiosPromise => {
  return client.delete(deleteRecipeUrl(recipeId))
}
