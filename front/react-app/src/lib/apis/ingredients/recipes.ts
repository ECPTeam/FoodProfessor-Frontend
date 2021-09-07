import client from 'lib/apis/client'
import { ingredientRecipesUrl } from 'urls/index'

export const fetchIngredientRecipesData = (ingredientName: string): Promise<any> => {
  return client
    .get(ingredientRecipesUrl(ingredientName))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
