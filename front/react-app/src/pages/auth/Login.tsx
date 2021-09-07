import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { AuthContext } from 'App'
import { login } from 'lib/apis/auth'

import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'

import AlertMessage from 'components/commons/AlertMessage'

export type loginErrorMessageTypes = {
  errors: string[]
}

const Login: React.FC = () => {
  const history = useHistory()

  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext)

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<loginErrorMessageTypes | undefined>()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append('email', email)
    formData.append('password', password)

    return formData
  }

  const postLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    const params = createFormData()

    try {
      const res = await login(params)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsLoggedIn(true)
        setCurrentUser(res.data.data)

        history.push('/top')
      }
    } catch (err) {
      setAlertMessageOpen(true)
      setErrorMessages(err.response.data)
    }
  }

  return (
    <>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        message="ログインできませんでした。"
      />
      <form noValidate autoComplete="off">
        <Card className="px-14 maxSm:px-4 py-2 max-w-xl text-center mx-auto">
          <CardHeader title="ログイン" />
          <CardContent>
            <TextField
              className="mb-2"
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            {errorMessages?.errors ? (
              errorMessages?.errors.map((error: string, index: number) => (
                <p className="text-red text-sm float-right mb-8" key={index}>
                  {error}
                </p>
              ))
            ) : (
              <p className="mb-8"></p>
            )}
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              placeholder="6文字以上"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="mt-8 mb-4 px-10 py-2 rounded-full bg-lightGreen text-white"
              onClick={postLogin}
            >
              ログイン
            </button>
            <Box textAlign="center" className="mt-2">
              <Typography variant="body2">
                <Link to="/register" className="hover:underline">
                  アカウントをお持ちでないですか？
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default Login
