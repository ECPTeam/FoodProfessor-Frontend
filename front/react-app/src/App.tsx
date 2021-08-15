import React, { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import CommonLayout from 'components/commons/CommonLayout'
import Top from 'pages/Top'
import Register from 'pages/auth/Register'
import Login from 'pages/auth/Login'
import Profile from 'pages/users/Profile'
import EditProfile from 'pages/users/EditProfile'
import { getCurrentUser } from 'lib/apis/auth'
import { User } from 'types/user'

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  }
)

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsLoggedIn(true)
        setCurrentUser(res?.data.data)
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  // ユーザーが認証済みかどうかでルーティングを決定
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isLoggedIn) {
        return children
      } else {
        return <Redirect to="/login" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}>
        <CommonLayout>
          <Switch>
            <Route exact path="/top" component={Top} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Private>
              <Route exact path="/users/:userId" component={Profile} />
              <Route exact path="/auth/:userId/edit" component={EditProfile} />
            </Private>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
