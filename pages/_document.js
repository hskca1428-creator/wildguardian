import { Html, Head, Main, NextScript } from 'next/document';

// Google Tag Manager container for wildguardian.com.au.
// The <script> goes as high in <head> as possible and the <noscript> iframe
// immediately after the opening <body> tag, exactly as Google specifies.
// Because this lives in _document.js it is applied to every page.
const GTM_ID = 'GTM-K4GGGBD4';
const SHARE_IMAGE = 'https://www.wildguardian.com.au/og-default.png';

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function Document() {
  return (
    <Html lang="en-AU">
      <Head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        {/* End Google Tag Manager */}
        {/* Default link-preview image for every page (Facebook, WhatsApp, iMessage, X, LinkedIn). */}
        <meta property="og:image" content={SHARE_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="WildGuardian: identify Australian wildlife safely. In an emergency, call 000."
        />
        <meta name="twitter:image" content={SHARE_IMAGE} />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
