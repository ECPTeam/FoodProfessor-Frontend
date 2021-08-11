import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import Cookies from 'js-cookie'
import { Logout } from 'lib/apis/auth'
import { AuthContext } from 'App'

import MainLogo from 'images/logo.png'
import DefaultIcon from 'images/defaultIcon.png'
import SearchForm from 'components/commons/header/SearchForm'
import BurgerMenu from 'components/commons/header/BurgerMenu'

const Header: React.FC = () => {
  const { loading, currentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false)
  const history = useHistory()

  const changeOpenUserMenu = (): void => {
    setIsOpenUserMenu(!isOpenUserMenu)
  }

  // windowのクリックでuserMenu閉じる
  window.addEventListener('click', (e: any): void => {
    if (e.target.id === 'userIcon' || e.target.id === 'userMenu') return
    setIsOpenUserMenu(false)
  })

  const handleLogout = async () => {
    try {
      const res = await Logout()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsLoggedIn(false)
        history.push('/top')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証時によってボタン変更
    if (!loading) {
      if (isLoggedIn) {
        return (
          <div className="flex maxLg:hidden">
            <Link to="#" className="mt-4 mr-8 text-lg text-darkRed font-bold">
              マイレシピ
            </Link>
            <Link to="#" className="mt-4 mr-8 text-lg text-darkRed font-bold">
              レシピ登録
            </Link>
            <Link to="#" className="mt-4 mr-8 text-lg text-darkRed font-bold">
              カテゴリ一覧
            </Link>
            <img
              // プロフィール画像が存在しないならデフォルト画像表示
              src={currentUser?.profile_image ? currentUser?.profile_image : DefaultIcon}
              className="w-16 h-16 mr-4 cursor-pointer"
              id="userIcon"
              alt="icon"
              onClick={changeOpenUserMenu}
            />
            <div
              className="absolute top-20 right-4 w-40 h-32 px-4 bg-white border-4 rounded-xl border-orange z-10"
              id="userMenu"
              style={{ display: isOpenUserMenu ? '' : 'none' }}
            >
              <Link to="#" className="inline-block mt-2 pb-2 w-full text-md text-center border-b-2 border-orange">
                マイページ
              </Link>
              <br />
              <Link to="#" className="inline-block mt-2 pb-2 w-full text-md text-center border-b-2 border-orange">
                設定
              </Link>
              <br />
              <button className="mt-2 mb-2 ml-5 text-md text-center" onClick={handleLogout}>
                ログアウト
              </button>
            </div>
          </div>
        )
      } else {
        return (
          <div className="flex maxMd:hidden">
            <Link to="/login" className="mt-4 mr-4 text-lg text-darkRed font-bold">
              ログイン
            </Link>
            <Link to="/register" className="mt-4 mr-3 text-lg text-darkRed font-bold">
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
    <div>
      <div className={isLoggedIn ? 'minLg:hidden' : 'minMd:hidden'}>
        <BurgerMenu right />
      </div>

      <div className="flex w-full h-20 bg-orange mb-8">
        <div className="relative top-2 left-2 w-32 h-32">
          <Link to="/top">
            <img src={MainLogo} alt="main logo" />
          </Link>
        </div>

        <SearchForm />

        <div className="relative top-2 ml-auto">
          <AuthButtons />
        </div>
      </div>
    </div>
  )
}

export default Header
