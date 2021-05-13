import { Provider } from 'react-redux';
import { useStore } from '../store';
import NextNprogress from 'nextjs-progressbar';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <NextNprogress color="#fff" startPosition={0.3} stopDelayMs={200} height={3} />
    </Provider>
  );
}

export default MyApp;
