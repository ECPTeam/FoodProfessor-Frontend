import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import { fetchEditProfileData } from 'lib/apis/users/editProfile'

import { AuthContext } from 'App'

import { User } from 'types/user'
import { updateProfileData } from 'lib/apis/users/editProfile'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import AlertMessage from 'components/commons/AlertMessage'

export type userEditErrorMessageTypes = {
  firstName: string[]
  lastName: string[]
  email: string[]
  profileImage?: string[]
}

const Profile: React.FC<any> = ({ match }) => {
  const history = useHistory()

  const { currentUser, isLoggedIn } = useContext(AuthContext)
  const [user, setUser] = useState<User | null>()

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<userEditErrorMessageTypes | undefined>()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [profileImage, setProfileImage] = useState<File>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchEditProfileData(match.params.userId).then((data) => {
      setUser(data.user)
      setFirstName(data.user.firstName)
      setLastName(data.user.lastName)
      setEmail(data.user.email)
      if (!isLoggedIn || data.user?.id !== currentUser?.id) {
        history.push('/top')
      }
    })
  }, [])

  const uploadProfileImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file: File = e.currentTarget.files[0]
      setProfileImage(file)
    }
  }, [])

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    if (profileImage) formData.append('profileImage', profileImage)

    formData.append('email', email)

    return formData
  }

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (isLoggedIn) {
      window.scrollTo(0, 0)
      const params = createFormData()

      if (user && user?.id !== currentUser?.id) {
        history.push('/top')
      }

      try {
        const res = await updateProfileData(user?.id, params)

        if (res.status === 201) {
          window.location.href = `/users/${user?.id}` // ヘッダーのアイコンを更新するためページをロード
        }
      } catch (err) {
        setAlertMessageOpen(true)
        setErrorMessages(err.response.data[0])
      }
    } else {
      history.push('/login')
    }
  }

  return (
    <>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        message="会員情報を更新できませんでした。"
      />
      {/* ユーザー情報を読み込ませてからvalueに追加 */}
      {user ? (
        <form noValidate autoComplete="off">
          <Card className="px-14 maxSm:px-4 py-2 max-w-xl text-center mx-auto">
            <CardHeader title="プロフィール編集" />
            <CardContent>
              <div className="flex justify-between">
                <TextField
                  variant="outlined"
                  required
                  label="姓"
                  defaultValue={user?.firstName}
                  margin="dense"
                  className="mr-2 mb-4"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  label="名"
                  defaultValue={user?.lastName}
                  margin="dense"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              {errorMessages?.firstName ? (
                errorMessages?.firstName.map((error: string, index: number) => (
                  <p className="text-red text-sm float-left mb-4" key={index}>
                    姓字{error}
                  </p>
                ))
              ) : (
                <p className="mb-4"></p>
              )}
              {errorMessages?.lastName ? (
                errorMessages?.lastName.map((error: string, index: number) => (
                  <p className="text-red text-sm float-left mb-4" key={index}>
                    名前{error}
                  </p>
                ))
              ) : (
                <p className="mb-4"></p>
              )}
              <TextField
                variant="outlined"
                required
                label="メールアドレス"
                fullWidth
                defaultValue={user?.email}
                margin="dense"
                className="mb-4"
                onChange={(event) => setEmail(event.target.value)}
              />
              {errorMessages?.email ? (
                errorMessages?.email.map((error: string, index: number) => (
                  <p className="text-red text-sm text-left mb-4" key={index}>
                    メールアドレス{error}
                  </p>
                ))
              ) : (
                <p className="mb-4"></p>
              )}
              <div className="relative">
                <label htmlFor="profileImage" className="float-left mb-2 cursor-pointer">
                  プロフィール画像
                </label>
                <input
                  accept="image/*,.png,.jpg,.jpeg,.gif"
                  id="profileImage"
                  type="file"
                  className="float-left"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    uploadProfileImage(e)
                  }}
                />
              </div>
              {errorMessages?.profileImage ? (
                errorMessages?.profileImage.map((error: string, index: number) => (
                  <p className="text-red text-sm float-left mb-4" key={index}>
                    プロフィール画像{error}
                  </p>
                ))
              ) : (
                <p className="mb-4"></p>
              )}
              <button
                type="submit"
                className="mt-8 mb-4 px-10 py-2 rounded-full bg-lightGreen text-white"
                onClick={handleUpdate}
              >
                更新
              </button>
            </CardContent>
          </Card>
        </form>
      ) : (
        <></>
      )}
    </>
  )
}

export default Profile
