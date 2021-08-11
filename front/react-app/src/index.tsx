import React from 'react'
import ReactDOM from 'react-dom'
import './tailwind.css'
import './burgerMenuStyles.css' // バーガーメエニューのstyleを上書き
import App from './App'
// import ApiTest from 'ApiTest'

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <ApiTest /> */}
  </React.StrictMode>,
  document.getElementById('root')
)
