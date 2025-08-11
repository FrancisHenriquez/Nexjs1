import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, realstate',
  description: 'find the perfect rental properties'
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children} </main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
