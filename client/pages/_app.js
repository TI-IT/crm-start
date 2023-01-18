import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  const server_host =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9001'
      : 'https://crm.servertiit.keenetic.pro';

  return <Component {...pageProps} server_host={server_host} />;
}
