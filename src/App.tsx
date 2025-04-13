import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Flip, ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { queryClient } from '@/lib/react-query';
import RoutesApp from '@/routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <RoutesApp />
        <ToastContainer
          transition={Flip}
          autoClose={3000}
          draggable
          closeButton
          position='bottom-right'
          stacked
          theme={localStorage.getItem('vite-ui-theme') || 'light'}
          limit={3}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
