import React, { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import Cookies from 'js-cookie'
import { Logout } from 'lib/apis/auth'
import { AuthContext } from 'App'

import SearchForm from 'components/commons/header/SearchForm'
import DefaultIcon from 'images/defaultIcon.png'
import { slide as Menu } from 'react-burger-menu' // react-burger-menuというパッケージ

type BurgerMenuProps = {
  right: boolean
}

type BurgerMenuState = {
  isOpen: boolean
}

const BurgerMenu: React.FC<BurgerMenuProps> = (props) => {
  const { loading, currentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false)
  const [isOpenBurgerUserMenu, setIsOpenBurgerUserMenu] = useState<boolean>(false)
  const history = useHistory()

  const changeOpenUserMenu = (): void => {
    setIsOpenBurgerUserMenu(!isOpenBurgerUserMenu)
  }

  window.addEventListener('click', (e: any): void => {
    if (e.target.id === 'userIcon' || e.target.id === 'userMenu') return
    setIsOpenBurgerUserMenu(false)
  })

  // -------メニューアイテム（ユーザーアイコン以外）クリックでメニュー＆ユーザーメニュー閉じる--------

  const closeBurgerMenu = (): void => {
    setIsOpenBurgerMenu(false)

    setIsOpenBurgerUserMenu(false)
  }

  // メニューのstate(isOpen)を変更してメニュー閉じる
  const BurgerMenuStateChange = (state: BurgerMenuState): void => {
    setIsOpenBurgerMenu(state.isOpen)
  }

  // ---------------------------------------------------------------------------------------

  // ログアウトと同時にメニュー閉じる(handleLogoutが２つあって不満)
  const logout = (): void => {
    handleLogout()
    closeBurgerMenu()
  }

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

  const AuthMenuItems = () => {
    // 認証時によってボタン変更
    if (!loading) {
      if (isLoggedIn) {
        return (
          <div>
            <Link to="#" className="bm-item menu-item" onClick={closeBurgerMenu}>
              マイレシピ
            </Link>
            <Link to="#" className="bm-item menu-item" onClick={closeBurgerMenu}>
              レシピ登録
            </Link>
            <Link to="#" className="bm-item menu-item" onClick={closeBurgerMenu}>
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
              className="relative top-2 right-0 w-40 h-36 px-4 bg-white border-4 rounded-xl border-orange"
              id="userMenu"
              style={{ display: isOpenBurgerUserMenu ? '' : 'none' }}
            >
              <Link
                to="#"
                className="inline-block mt-2 pb-2 w-full text-md text-center border-b-2 border-orange"
                onClick={closeBurgerMenu}
              >
                マイページ
              </Link>
              <br />
              <Link
                to="#"
                className="inline-block mt-2 pb-2 w-full text-md text-center border-b-2 border-orange"
                onClick={closeBurgerMenu}
              >
                設定
              </Link>
              <br />
              <button className="mt-2 mb-2 ml-5 text-md text-center" onClick={logout}>
                ログアウト
              </button>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <Link to="/login" className="bm-item menu-item" onClick={closeBurgerMenu}>
              ログイン
            </Link>
            <Link to="/register" className="bm-item menu-item" onClick={closeBurgerMenu}>
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
    <Menu {...props} isOpen={isOpenBurgerMenu} onStateChange={(state) => BurgerMenuStateChange(state)}>
      <AuthMenuItems />
    </Menu>
  )
}

export default BurgerMenu
