import client from 'lib/apis/client'
import { recipeDetailUrl } from 'urls/index'

export const fetchRecipeData = (recipeId: number): Promise<any> => {
  return client
    .get(recipeDetailUrl(recipeId))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
