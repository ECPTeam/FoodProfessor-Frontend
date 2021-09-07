import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { AuthContext } from 'App'
import { register } from 'lib/apis/auth'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import AlertMessage from 'components/commons/AlertMessage'

export type registerErrorMessageTypes = {
  firstName: string[]
  lastName: string[]
  email: string[]
  password: string[]
  passwordConfirmation: string[]
}

const Register: React.FC = () => {
  const history = useHistory()

  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext)

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<registerErrorMessageTypes | undefined>()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('passwordConfirmation', passwordConfirmation)

    return formData
  }

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    const params = createFormData()

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
      setAlertMessageOpen(true)
      setErrorMessages(err.response.data.errors)
    }
  }

  return (
    <>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        message="会員登録できませんでした。"
      />

      <form noValidate autoComplete="off">
        <Card className="px-14 maxSm:px-4 py-2 max-w-xl text-center mx-auto">
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
            {errorMessages?.firstName ? (
              errorMessages?.firstName.map((error: string, index: number) => (
                <p className="text-red text-sm float-left mb-4" key={index}>
                  姓{error}
                </p>
              ))
            ) : (
              <p className="mb-4"></p>
            )}
            {errorMessages?.lastName ? (
              errorMessages?.lastName.map((error: string, index: number) => (
                <p className="text-red text-sm float-left mb-4" key={index}>
                  名{error}
                </p>
              ))
            ) : (
              <p className="mb-4"></p>
            )}
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
            {errorMessages?.email ? (
              errorMessages?.email.map((error: string, index: number) => (
                <p className="text-red text-sm float-left mb-4" key={index}>
                  メールアドレス{error}
                </p>
              ))
            ) : (
              <p className="mb-4"></p>
            )}
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
            {errorMessages?.password ? (
              errorMessages?.password.map((error: string, index: number) => (
                <p className="text-red text-sm float-left mb-4" key={index}>
                  パスワード{error}
                </p>
              ))
            ) : (
              <p className="mb-4"></p>
            )}
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード(確認)"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              className="mb-4"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            {errorMessages?.passwordConfirmation ? (
              errorMessages?.passwordConfirmation.map((error: string, index: number) => (
                <p className="text-red text-sm float-left mb-4" key={index}>
                  パスワード確認{error}
                </p>
              ))
            ) : (
              <p className="mb-4"></p>
            )}
            <button
              type="submit"
              className="mt-8 mb-4 px-10 py-2 rounded-full bg-lightGreen text-white"
              onClick={handleRegister}
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
