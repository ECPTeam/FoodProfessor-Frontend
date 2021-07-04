import client from 'lib/api/client'
import Cookies from 'js-cookie'

import { RegisterParams, LoginParams } from 'types/index'

// サインアップ（新規アカウント作成）
export const register = (params: RegisterParams) => {
  return client.post('auth', params)
}

// サインイン（ログイン）
export const login = (params: LoginParams) => {
  return client.post('auth/sign_in', params)
}

// サインアウト（ログアウト）
export const Logout = () => {
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  })
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  })
}
