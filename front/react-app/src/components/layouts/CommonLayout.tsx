import React from 'react'

import { Container, Grid } from '@material-ui/core'

import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'

type CommonLayoutProps = {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className="mt-12">
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
