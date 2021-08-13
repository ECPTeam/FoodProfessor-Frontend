import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

type Option = {
  ignoreHeaders: boolean
}

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options: Option = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3000/api/',
  }),
  options
)

export default client
