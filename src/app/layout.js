import './globals.css';
import { Quicksand } from 'next/font/google';
import Header from './components/Header';
import '@fortawesome/fontawesome-svg-core/styles.css';

const workSans = Quicksand({ variable: '--font-quicksand', subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${workSans.variable} font-sans tracking-tighter w-full flex flex-col justify-center items-center`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
