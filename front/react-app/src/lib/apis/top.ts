import client from 'lib/apis/client'
import { topPageUrl } from 'urls/index'

export const fetchTopData = () => {
  return client
    .get(topPageUrl)
    .then((res) => {
      return res.data
    })
    .catch((e) => console.error(e))
}
