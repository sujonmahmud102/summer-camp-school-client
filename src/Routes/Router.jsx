import { createBrowserRouter } from 'react-router-dom';
import Main from '../Pages/Layout/Main';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home/Home';
import Instructors from '../Pages/Instructors/Instructors';
import Classes from '../Pages/Classes/Classes';
import Dashboard from '../Pages/Layout/Dashboard';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses';
import MySelectedClasses from '../Pages/Dashboard/Student/MySelectedClasses';
import MyEnrolledClasses from '../Pages/Dashboard/Student/MyEnrolledClasses';
import PaymentHistory from '../Pages/Dashboard/Student/PaymentHistory';
import AddClass from '../Pages/Dashboard/Instructors/AddClass';
import MyClasses from '../Pages/Dashboard/Instructors/MyClasses';
import UpdateClass from '../Pages/Dashboard/Instructors/UpdateClass';
import PrivateRoute from './PrivateRoute';



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // for admin
            {
                path: '/dashboard/manageClasses',
                element: <ManageClasses></ManageClasses>
            },
            {
                path: '/dashboard/manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            // for instructors
            {
                path: '/dashboard/addAClass',
                element: <AddClass></AddClass>
            },
            {
                path: '/dashboard/myClasses',
                element: <MyClasses></MyClasses>
            },
            // for student
            {
                path: '/dashboard/selectedClasses',
                element: <MySelectedClasses></MySelectedClasses>
            },
            {
                path: '/dashboard/enrolledClasses',
                element: <MyEnrolledClasses></MyEnrolledClasses>
            },
            {
                path: '/dashboard/paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: '/dashboard/updateClass/:id',
                element: <UpdateClass></UpdateClass>,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
            },
        ]
    }
])


export default router;