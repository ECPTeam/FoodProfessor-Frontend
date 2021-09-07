import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import { deleteCommentUrl } from 'urls/index'

export const deleteCommentData = (recipeId: number | undefined, commentId: number | undefined): AxiosPromise => {
  return client.delete(deleteCommentUrl(recipeId, commentId))
}
