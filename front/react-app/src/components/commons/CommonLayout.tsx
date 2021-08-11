import React from 'react'
import { useHistory } from 'react-router-dom'

import { Container, Grid } from '@material-ui/core'

import Header from 'components/commons/header/Frame'
import Footer from 'components/commons/Footer'

type CommonLayoutProps = {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const history = useHistory()

  // root_urlを/topに設定
  if (history.location.pathname === '/') {
    history.push('/top')
  }

  return (
    <div className="relative min-h-screen">
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container justify="center">
            <Grid item>{children}</Grid>
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CommonLayout
