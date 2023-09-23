import logo from '../../assets/logo.png';
import { FaBars, FaCheckSquare, FaClipboardList, FaElementor, FaHome, FaMoneyCheck, FaPeopleArrows, FaPlusCircle, FaUserFriends, FaUsers, FaWallet } from 'react-icons/fa';
import { } from "react-icons/bi";
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';


const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    

    return (
        <div>
            <Helmet>
                <title>Dashboard | Champion Sports School</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">

                    {/* navbar */}

                    <div className="absolute left-0 md:static w-full navbar-start md:navbar bg-base-200 px-16">
                        <div className="flex-1">
                            <a className="hidden lg:block btn btn-ghost normal-case text-xl">Dashboard</a>
                        </div>
                        <div className="flex-none gap-2">

                            <div className="dropdown dropdown-end flex items-center gap-3">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className=" ">
                                        <img className='rounded-full w-16 h-16 mr-3' src={user?.photoURL} alt="User image" />

                                    </div>
                                </label>
                                <div className='mr-6'>
                                    <p className='text-black'>{user?.displayName}</p>
                                    <p className='text-black'>{user?.email}</p>
                                    {/* todo make it dynamic */}
                                    <p className='text-xs'>
                                        <span>
                                            {isAdmin && 'Admin'}
                                            {isInstructor && 'Instructor'}
                                            {(isAdmin || isInstructor) || 'Student'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-xs md:btn-sm drawer-button lg:hidden absolute top-4 md:top-6 left-0 md:left-5 text-xl"> <FaBars /></label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 h-full bg-error text-base-content">
                        {/* Sidebar content here */}
                        <li className='my-4'>
                            <div>
                                <Link to='/dashboard/' className="btn btn-ghost "><img className='w-36 h-10 ' src={logo} alt="" /> </Link>
                            </div>
                        </li>
                        {/* dynamic route */}

                        {
                            isAdmin && <>
                                {/* admin route */}
                                <li>
                                    <NavLink
                                        to='/dashboard/manageClasses'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaClipboardList></FaClipboardList> Manage Classes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/manageUsers'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaUsers></FaUsers> Manage Users
                                    </NavLink>
                                </li>
                            </>
                        }

                        {/* instructors route */}

                        {
                            isInstructor && <>
                                <li>
                                    <NavLink
                                        to='/dashboard/addAClass'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaPlusCircle></FaPlusCircle> Add A Class
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/myClasses'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaClipboardList></FaClipboardList> My Classes
                                    </NavLink>
                                </li>
                            </>
                        }


                        {/* student route */}
                        {
                            !(isAdmin || isInstructor) &&
                            (<>
                                <li>
                                    <NavLink
                                        to='/dashboard/selectedClasses'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaCheckSquare></FaCheckSquare> My Selected Classes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/enrolledClasses'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaMoneyCheck></FaMoneyCheck> My Enrolled Classes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard/paymentHistory'
                                        className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                                    ><FaWallet></FaWallet> Payment History
                                    </NavLink>
                                </li>
                            </>)
                        }

                        <hr className="border border-white my-10" />

                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaHome></FaHome> Home
                            </NavLink>
                        </li>
                        <li className='mr-4'>
                            <NavLink
                                to='/instructors'
                                className={({ isActive }) => isActive ? "font-bold text-error" : ""}
                            ><FaUserFriends></FaUserFriends> Instructors
                            </NavLink>
                        </li>
                        <li className='mr-4'>
                            <NavLink
                                to='/classes'
                                className={({ isActive }) => isActive ? "font-bold text-error" : ""}
                            ><FaElementor></FaElementor> Classes
                            </NavLink>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;