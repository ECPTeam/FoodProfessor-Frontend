import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import { editRecipeUrl, updateRecipeUrl } from 'urls/index'

export const fetchEditRecipeData = (recipeId: number): Promise<any> => {
  return client
    .get(editRecipeUrl(recipeId))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}

export const updateRecipeData = (recipeId: number | undefined, params: FormData): AxiosPromise => {
  return client.put(updateRecipeUrl(recipeId), params)
}
