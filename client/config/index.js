
import pkg from '../../package.json'

export const appName = pkg.name
export const isDev = process.env.APP_ENV === 'development'
export const isProduction = process.env.APP_ENV === 'production'
const config = {
  appName,
  api: {
    PROTOCOL: isProduction ? 'https' : 'http',
    HOST: process.env.API_HOST
  },
  ENV: process.env.APP_ENV
}

export const API = `${config.api.PROTOCOL}://${config.api.HOST}`

export default config
