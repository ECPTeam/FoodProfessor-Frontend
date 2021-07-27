import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import { AuthContext } from 'App'
import { register } from 'lib/api/auth'
import { RegisterParams } from 'types/auth'

// サインアップ用ページ
const Register: React.FC = () => {
  const history = useHistory()

  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext)

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: RegisterParams = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }

    try {
      const res = await register(params)

      if (res.status === 200) {
        // アカウント作成と同時にログイン
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsLoggedIn(true)
        setCurrentUser(res.data.data)

        history.push('/top')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className="px-10 py-2 max-w-xl text-center">
          <CardHeader title="アカウント登録" />
          <CardContent>
            <div className="flex justify-between">
              <TextField
                variant="outlined"
                required
                label="姓"
                value={firstName}
                margin="dense"
                className="mr-2 mb-4"
                onChange={(event) => setFirstName(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                label="名"
                value={lastName}
                margin="dense"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              className="mb-4"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              className="mb-4"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード(確認)"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            <button
              type="submit"
              className="mt-8 mb-4 px-10 py-2 rounded-full bg-lightGreen text-white"
              onClick={handleSubmit}
            >
              登録
            </button>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default Register
