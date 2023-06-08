import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Main from '../Pages/Layout/Main';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>
    }
])


export default router;