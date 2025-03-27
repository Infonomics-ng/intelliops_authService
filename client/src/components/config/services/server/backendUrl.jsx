const environments = {
  local: import.meta.env.VITE_BACKEND_URL_LOCAL,
  development: import.meta.env.VITE_BACKEND_URL_DEV,
  corporate: import.meta.env.VITE_BACKEND_URL_CORPORATE,
  connect: import.meta.env.VITE_BACKEND_URL_CONNECT,
  testserver: import.meta.env.VITE_BACKEND_URL_TESTSERVER
}

const currentEnv = import.meta.env.VITE_NODE_ENV || 'local'

const BaseURL = {
  BACKEND_SERVER_URL: environments[currentEnv]
}

export default BaseURL
