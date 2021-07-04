import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { makeStyles, Theme } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { Logout } from 'lib/api/auth'

import { AuthContext } from 'App'

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  linkBtn: {
    textTransform: 'none',
  },
}))

const Header: React.FC = () => {
  const { loading, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const classes = useStyles()
  const history = useHistory()

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await Logout()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsLoggedIn(false)
        history.push('/top')

        console.log('Succeeded in sign out')
      } else {
        console.log('Failed in sign out')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isLoggedIn) {
        return (
          <Button color="inherit" className={classes.linkBtn} onClick={handleLogout}>
            Sign out
          </Button>
        )
      } else {
        return (
          <>
            <Button component={Link} to="/login" color="inherit" className={classes.linkBtn}>
              Sign in
            </Button>
            <Button component={Link} to="/register" color="inherit" className={classes.linkBtn}>
              Sign Up
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.iconButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to="/" variant="h6" className={classes.title}>
            Sample
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
