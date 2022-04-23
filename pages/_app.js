import '../styles/globals.sass'

import Head from 'next/head'

import Layout from './components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tab for Charity</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
