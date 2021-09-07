import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { createCommentData } from 'lib/apis/comments/createComment'

import { Comment } from 'types/comment'

import { AuthContext } from 'App'

import TextField from '@material-ui/core/TextField'

type propsType = {
  recipeId: number | undefined
  increaseComment: (comment: Comment[]) => void
}

type createCommentErrorMessageTypes = {
  commentContent: string[]
}

const CommentForm: React.FC<propsType> = (props) => {
  const history = useHistory()

  const { currentUser, isLoggedIn } = useContext(AuthContext)

  const [errorMessages, setErrorMessages] = useState<createCommentErrorMessageTypes | undefined>()

  const [content, setContent] = useState<string>('')

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append('currentUserId', String(currentUser?.id))
    formData.append('commentContent', content)

    return formData
  }

  const createComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params = createFormData()

    if (isLoggedIn) {
      try {
        const res = await createCommentData(props.recipeId, params)

        if (res.status === 201) {
          props.increaseComment(res.data.comments)
          setErrorMessages(undefined)
          setContent('')
        }
      } catch (err) {
        setErrorMessages(err.response.data[0])
      }
    } else {
      history.push('/login')
    }
  }

  return (
    <>
      {props.recipeId ? (
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={content}
            label="コメント"
            margin="dense"
            className="block mt-4 mr-2"
            onChange={(event) => setContent(event.target.value)}
          />
          {errorMessages?.commentContent ? (
            errorMessages?.commentContent.map((error: string, index: number) => (
              <p className="text-red text-sm float-left mb-4" key={index}>
                内容{error}
              </p>
            ))
          ) : (
            <></>
          )}
          <button
            type="submit"
            className="mt-2 px-10 py-2 float-right rounded-full bg-lightGreen text-white"
            onClick={createComment}
          >
            投稿
          </button>
        </form>
      ) : (
        <></>
      )}
    </>
  )
}

export default CommentForm
