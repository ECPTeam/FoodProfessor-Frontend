import client from 'lib/apis/client'
import Cookies from 'js-cookie'
import { registerUrl, loginUrl, logOutUrl, sessionsUrl } from 'urls/index'

import { RegisterParams, LoginParams } from 'types/auth'

// サインアップ（新規アカウント作成）
export const register = (params: RegisterParams) => {
  return client.post(registerUrl, params)
}

// サインイン（ログイン）
export const login = (params: LoginParams) => {
  return client.post(loginUrl, params)
}

// サインアウト（ログアウト）
export const Logout = () => {
  return client.delete(logOutUrl, {
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
  return client.get(sessionsUrl, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  })
}
