import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'

import { AuthContext } from 'App'
import { login } from 'lib/api/auth'
import { LoginParams } from 'types/auth'

// サインイン用ページ
const Login: React.FC = () => {
  const history = useHistory()

  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: LoginParams = {
      email: email,
      password: password,
    }

    try {
      const res = await login(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsLoggedIn(true)
        setCurrentUser(res.data.data)

        history.push('/top')

        console.log('Signed in successfully!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className="px-10 py-2 max-w-xl text-center">
          <CardHeader title="ログイン" />
          <CardContent>
            <TextField
              className="mb-8"
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
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
              disabled={!email || !password ? true : false}
              className="mt-8 mb-4 px-10 py-2 rounded-full bg-lightGreen text-white"
              onClick={handleSubmit}
            >
              ログイン
            </button>
            <Box textAlign="center" className="mt-2">
              <Typography variant="body2">
                <Link to="/register">アカウントをお持ちでないですか？</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default Login
