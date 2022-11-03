import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AuthProvider from '../context/AuthProvider'
import Toast from '../components/toast/Toast'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
  <AuthProvider>
    <Toast></Toast>
    <Head>
      <title>Verzel teste</title>
    </Head>
  <Component {...pageProps} />
  </AuthProvider>
  </>)
}

export default MyApp
