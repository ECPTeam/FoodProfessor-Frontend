import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import { createCommentUrl } from 'urls/index'

export const createCommentData = (recipeId: number | undefined, params: FormData): AxiosPromise => {
  return client.post(createCommentUrl(recipeId), params)
}
