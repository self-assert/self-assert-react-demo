import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx';

async function enableMocking() {
  const { worker } = await import('./Server');
  return worker.start();
}

const rootElement = createRoot(document.getElementById('root')!);

enableMocking().finally(() => {
  rootElement.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
