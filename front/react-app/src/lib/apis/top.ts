import client from 'lib/apis/client'
import { topPageUrl } from 'urls/index'

export const fetchTopData = (): Promise<any> => {
  return client
    .get(topPageUrl)
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
