import { AxiosPromise } from 'axios'

import client from 'lib/apis/client'
import { createRecipeUrl } from 'urls/index'

export const createRecipeData = (params: FormData): AxiosPromise => {
  return client.post(createRecipeUrl, params)
}
