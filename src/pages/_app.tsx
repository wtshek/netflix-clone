import { LoaderProvider } from '@/components/LoaderProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoaderProvider>
      <Component {...pageProps} />
    </LoaderProvider>
  );
}
