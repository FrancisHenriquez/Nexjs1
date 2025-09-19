import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, realstate',
  description: 'find the perfect rental properties'
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
