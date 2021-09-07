import client from 'lib/apis/client'
import { searchRecipesUrl } from 'urls/index'

export const fetchSearchRecipesData = (recipeName: string): Promise<any> => {
  return client
    .get(searchRecipesUrl(recipeName))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
