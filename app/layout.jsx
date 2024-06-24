import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'RashaMall',
  description: 'online shopping, shopping electronic devices, shopping Home apliances',
  keywords: 'online, home apliances, electronic devices'
}

const MainLayout = ({ children}) => {
  return (
    <html lang='en'>
        <body>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </body>
    </html>
  )
}

export default MainLayout