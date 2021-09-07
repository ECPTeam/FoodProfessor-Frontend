import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import { favoriteRecipeUrl } from 'urls/index'

export const favoriteRecipeData = (params: FormData): AxiosPromise => {
  return client.post(favoriteRecipeUrl, params)
}
