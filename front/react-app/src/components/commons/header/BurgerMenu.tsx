import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { AuthContext } from 'App'

import { DefaultIconUrl } from 'images/defaultIcon'
import SearchForm from 'components/commons/header/SearchForm'
import { slide as Menu } from 'react-burger-menu' // react-burger-menuというパッケージ

type BurgerMenuProps = {
  right: boolean
}

type BurgerMenuState = {
  isOpen: boolean
}

const BurgerMenu: React.FC<BurgerMenuProps> = (props: BurgerMenuProps) => {
  const { loading, currentUser, isLoggedIn, handleLogout } = useContext(AuthContext)
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false)
  const [isOpenBurgerUserMenu, setIsOpenBurgerUserMenu] = useState<boolean>(false)

  const history = useHistory()

  // ユーザーメニュー表示切り替え
  const changeOpenUserMenu = (): void => {
    setIsOpenBurgerUserMenu(!isOpenBurgerUserMenu)
  }

  // 画面クリックでユーザーメニュー非表示
  window.addEventListener('click', (e: any): void => {
    if (e.target.id === 'userIcon' || e.target.id === 'userMenu') return
    setIsOpenBurgerUserMenu(false)
  })

  // -------バーガーメニューのアイテムクリックでバーガーメニュー＆ユーザーメニュー閉じる--------
  const closeBurgerMenu = (): void => {
    setIsOpenBurgerMenu(false)

    setIsOpenBurgerUserMenu(false)
  }

  // メニューのstate(isOpen)を変更してメニュー閉じる
  const BurgerMenuStateChange = (state: BurgerMenuState): void => {
    setIsOpenBurgerMenu(state.isOpen)
  }
  // ------------------------------------------------------------------------------------

  // ログアウトと同時にバーガーメニュー閉じる
  const closeBurgerMenuAndLogout = (): void => {
    handleLogout()
    closeBurgerMenu()
  }

  const AuthMenuItems = () => {
    // 認証時によってボタン変更
    if (!loading) {
      if (isLoggedIn) {
        return (
          <>
            <div className="relative right-10 mb-12">
              <SearchForm formStyles="relative top-6 left-10 ml-auto" closeBurgerMenu={closeBurgerMenu} />
            </div>
            <Link to="/recipe/create" className="mt-6 bm-item menu-item" onClick={closeBurgerMenu}>
              レシピ登録
            </Link>
            {currentUser?.profileImage ? (
              <img
                // プロフィール画像が存在しないならデフォルト画像表示
                src={currentUser?.profileImage.url ? currentUser?.profileImage.url : DefaultIconUrl}
                className="w-16 h-16 mt-6 mr-4 cursor-pointer rounded-full"
                id="userIcon"
                alt="icon"
                onClick={changeOpenUserMenu}
              />
            ) : (
              <></>
            )}
            <div
              // isOpenBurgerUserMenuがtrueかfalseかで表示切り替え
              className="relative top-2 right-0 w-40 h-24 pt-1 px-4 bg-white border-4 rounded-xl border-orange"
              id="userMenu"
              style={{ display: isOpenBurgerUserMenu ? '' : 'none' }}
            >
              <Link
                to={`/users/${currentUser?.id}`}
                className="inline-block mt-2 pb-2 w-full text-md text-center border-b-2 border-orange"
                onClick={closeBurgerMenu}
              >
                マイページ
              </Link>
              <br />
              <button className="mt-2 mb-2 ml-5 text-md text-center" onClick={closeBurgerMenuAndLogout}>
                ログアウト
              </button>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="relative right-10 mb-12">
              <SearchForm formStyles="relative top-6 left-10 ml-auto" closeBurgerMenu={closeBurgerMenu} />
            </div>
            {/* <button className="bm-item menu-item" onClick={handleGuestLogin}>
              ゲストログイン
            </button> */}
            <Link to="/login" className="bm-item menu-item" onClick={closeBurgerMenu}>
              ログイン
            </Link>
            <Link to="/register" className="bm-item menu-item" onClick={closeBurgerMenu}>
              会員登録
            </Link>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <Menu
      {...props}
      isOpen={isOpenBurgerMenu}
      // state変更でユーザーメニュー非表示
      onStateChange={(state) => BurgerMenuStateChange(state)}
    >
      <AuthMenuItems />
    </Menu>
  )
}

export default BurgerMenu
