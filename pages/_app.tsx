import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <NextNprogress color="#fff" startPosition={0.3} stopDelayMs={200} height={3} />
    </>
  );
}

export default MyApp;
