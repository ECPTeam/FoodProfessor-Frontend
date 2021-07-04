import React, { useContext } from 'react'

import { AuthContext } from 'App'

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Top: React.FC = () => {
  const { isLoggedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {isLoggedIn && currentUser ? (
        <>
          <h1>Signed in successfully!</h1>
          <h2>Email: {currentUser?.email}</h2>
          <h2>
            Name: {currentUser?.firstName} {currentUser?.lastName}
          </h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  )
}

export default Top
