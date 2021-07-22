import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Logout } from 'lib/api/auth'

import { AuthContext } from 'App'

import MainLogo from 'images/logo.png'
import SearchForm from 'components/layouts/SearchForm'

const Header: React.FC = () => {
  const { loading, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await Logout()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsLoggedIn(false)
        history.push('/top')

        console.log('Succeeded in sign out')
      } else {
        console.log('Failed in sign out')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isLoggedIn) {
        return (
          <button className="mt-4 mr-3 text-lg text-brown font-bold" onClick={handleLogout}>
            ログアウト
          </button>
        )
      } else {
        return (
          <div className="flex">
            <Link to="/login" className="mt-4 mr-4 text-lg text-brown font-bold">
              ログイン
            </Link>
            <Link to="/register" className="mt-4 mr-3 text-lg text-brown font-bold">
              会員登録
            </Link>
          </div>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <div className="flex w-full h-20 bg-orange">
      <div className="relative top-2 left-2 w-32 h-32">
        <Link to="/top">
          <img src={MainLogo} alt="main logo" />
        </Link>
      </div>

      <SearchForm />

      <div className="relative top-2 ml-auto mr-2">
        <AuthButtons />
      </div>
    </div>
  )
}

export default Header
