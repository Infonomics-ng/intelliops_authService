import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import tailwindConfig from './src/components/resources/css/tailwind.config.js'

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
}