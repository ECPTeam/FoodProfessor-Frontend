import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Logout } from 'lib/api/auth'

import { AuthContext } from 'App'

import MainLogo from 'images/logo.png'

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
          <button color="inherit" onClick={handleLogout}>
            Sign out
          </button>
        )
      } else {
        return (
          <>
            <button>Sign in</button>
            <button>Sign Up</button>
          </>
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

      <form className="relative top-2 left-12">
        <div className="flex">
          <section className="w-24 h-9 bg-darkRed text-orange">
            <p className="relative top-2.5 w-18 h-9 text-xs font-w6 text-center text-yellow-400">他ユーザー 🔽</p>
          </section>
          <input type="text" className="w-60 px-2" />
          <button className="w-12 bg-lightGreen text-white">
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="flex mt-1.5">
          <span className="mr-2 py-1 px-3 bg-brown rounded-xl text-xs text-center text-orange">にんじん</span>
          <span className="mr-2 py-1 px-3 bg-brown rounded-xl text-xs text-center text-orange">にんじん</span>
          <span className="mr-2 py-1 px-3 bg-brown rounded-xl text-xs text-center text-orange">にんじん</span>
          <span className="mr-2 py-1 px-3 bg-brown rounded-xl text-xs text-center text-orange">にんじん</span>
          <span className="mr-2 py-1 px-3 bg-brown rounded-xl text-xs text-center text-orange">じゃがいも</span>
        </div>
      </form>

      <div className="relative top-2 ml-auto mr-2">
        <div className="flex">
          <Link to="#" className="mt-4 mr-20 text-lg text-brown font-bold">
            レシピ検索
          </Link>
          <Link to="/login" className="mt-4 mr-4 text-lg text-brown font-bold">
            ログイン
          </Link>
          <Link to="/register" className="mt-4 mr-3 text-lg text-brown font-bold">
            会員登録
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
