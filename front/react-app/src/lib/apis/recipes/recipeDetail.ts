import client from 'lib/apis/client'
import Cookies from 'js-cookie'
import { recipeDetailUrl } from 'urls/index'

export const fetchRecipeData = (recipeId: number): Promise<any> => {
  return client
    .get(recipeDetailUrl(recipeId), {
      headers: {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
