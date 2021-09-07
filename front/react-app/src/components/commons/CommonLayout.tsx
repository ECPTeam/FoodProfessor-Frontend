import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/commons/header/Frame'
import Footer from 'components/commons/Footer'

type CommonLayoutProps = {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout: React.FC<CommonLayoutProps> = ({ children }: CommonLayoutProps) => {
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // root_urlを/topに設定
  if (history.location.pathname === '/') {
    history.push('/top')
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="fixed w-full z-10">
        <Header />
      </header>
      <main className="container flex-1 mt-28">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CommonLayout
