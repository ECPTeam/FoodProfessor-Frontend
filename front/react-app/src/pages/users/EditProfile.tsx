import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { fetchEditProfileData } from 'lib/apis/users/editProfile'

import { AuthContext } from 'App'

import { User } from 'types/user'

const Profile: React.FC<any> = ({ match }) => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User | null>()

  // APIに接続してデータ取得
  useEffect(() => {
    fetchEditProfileData(match.params.userId).then((data) => {
      setUser(data.user)
    })
  }, [])

  return <>aaaa</>
}

export default Profile
