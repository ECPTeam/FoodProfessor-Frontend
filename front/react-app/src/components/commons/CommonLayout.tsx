import { useHistory } from 'react-router-dom'

import Header from 'components/commons/header/Frame'
import Footer from 'components/commons/Footer'

type CommonLayoutProps = {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout: React.FC<CommonLayoutProps> = ({ children }: CommonLayoutProps) => {
  const history = useHistory()

  // root_urlを/topに設定
  if (history.location.pathname === '/') {
    history.push('/top')
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="container flex-1">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CommonLayout
