import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <main className="flex-1 p-4 md:ml-64">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;