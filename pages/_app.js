// pages/_app.js
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
