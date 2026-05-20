import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/components/AuthProvider';
import 'photoswipe/dist/photoswipe.css';

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
          <GlobalProvider>
            <Navbar />
            <main>{children} </main>
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
