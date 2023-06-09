import { createBrowserRouter } from 'react-router-dom';
import Main from '../Pages/Layout/Main';
import Register from '../Pages/Register/Register';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])


export default router;