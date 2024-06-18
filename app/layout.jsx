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
            <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout