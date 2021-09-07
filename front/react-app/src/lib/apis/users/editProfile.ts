import { AxiosPromise } from 'axios'
import client from 'lib/apis/client'
import Cookies from 'js-cookie'
import { editProfileUrl, updateProfileUrl } from 'urls/index'

export const fetchEditProfileData = (userId: number): Promise<any> => {
  return client
    .get(editProfileUrl(userId))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}

export const updateProfileData = (params: FormData): AxiosPromise => {
  return client.put(updateProfileUrl, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  })
}
