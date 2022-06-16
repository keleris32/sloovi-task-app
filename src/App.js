import AppRoutes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
      <AppRoutes />
    </>
  );
}

export default App;
