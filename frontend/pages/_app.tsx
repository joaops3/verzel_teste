import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AuthProvider from '../context/AuthProvider'
import Toast from '../components/toast/Toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
  <AuthProvider>
    <Toast></Toast>
  <Component {...pageProps} />
  </AuthProvider>
  </>)
}

export default MyApp
