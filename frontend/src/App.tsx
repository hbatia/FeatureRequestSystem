import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeatureRequestsPage } from '@/pages/FeatureRequestsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FeatureRequestsPage />
    </QueryClientProvider>
  );
}

export default App;
