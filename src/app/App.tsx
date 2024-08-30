import './App.css';
import { RouterProvider } from 'atomic-router-react';
import { router } from './routes/router';
import { Pages } from '../pages';

function App() {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
}

export default App;
