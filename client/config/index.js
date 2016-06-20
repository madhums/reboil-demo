
export const appName = 'ReBoil'
const config = {
  appName,
  api: {
    PROTOCOL: 'https',
    HOST: process.env.API_HOST
  },
  ENV: process.env.NODE_ENV
}

export const API = `${config.api.PROTOCOL}://${config.api.HOST}`
export const isProduction = process.env.NODE_ENV === 'production'
export const apiHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export default config
