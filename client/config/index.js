
export const appName = 'ReBoil'
export const isProduction = process.env.NODE_ENV === 'production'
const config = {
  appName,
  api: {
    PROTOCOL: isProduction ? 'https' : 'http',
    HOST: process.env.API_HOST
  },
  ENV: process.env.NODE_ENV
}

export const API = `${config.api.PROTOCOL}://${config.api.HOST}`
export const apiHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export default config
