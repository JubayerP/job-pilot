
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Routes';

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
      <CssBaseline />
    </div>
  );
}

export default App;
