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
import Payment from '../Pages/Dashboard/Student/Payment';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';
import StudentRoute from './StudentRoute';



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
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
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: '/dashboard/manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            // for instructors
            {
                path: '/dashboard/addAClass',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: '/dashboard/myClasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: '/dashboard/updateClass/:id',
                element: <InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>,
                loader: ({ params }) => fetch(`https://summer-camp-school-a12-server.vercel.app/classes/${params.id}`)
            },
            // for student
            {
                path: '/dashboard/selectedClasses',
                element: <StudentRoute><MySelectedClasses></MySelectedClasses></StudentRoute>
            },
            {
                path: '/dashboard/enrolledClasses',
                element: <StudentRoute><MyEnrolledClasses></MyEnrolledClasses></StudentRoute>
            },
            {
                path: '/dashboard/paymentHistory',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
            },
            {
                path: '/dashboard/payment',
                element: <Payment></Payment>
            },
        ]
    }
])


export default router;