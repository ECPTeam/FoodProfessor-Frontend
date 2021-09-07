import client from 'lib/apis/client'
import { categoryRecipesUrl } from 'urls/index'

export const fetchCategoryRecipesData = (categoryName: string): Promise<any> => {
  return client
    .get(categoryRecipesUrl(categoryName))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
