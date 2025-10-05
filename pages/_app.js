import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
import '../styles/globals.css'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </>
  )
}
