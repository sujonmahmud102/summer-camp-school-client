import logo from '../../assets/logo.png';
import { FaCheckSquare, FaClipboardList, FaElementor, FaHome, FaMoneyCheck, FaPeopleArrows, FaPlusCircle, FaUserFriends, FaUsers, FaWallet } from 'react-icons/fa';
import { } from "react-icons/bi";
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import { useQuery } from 'react-query';

const Dashboard = () => {
    const { user } = useAuth();

    const { data: users = [] } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        const data = await res.json();
        return data;
    });

    const currentUser = users?.find(cUser => cUser.email === user?.email);


    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">

                    {/* navbar */}

                    <div className="navbar bg-base-200 px-10">
                        <div className="flex-1">
                            <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
                        </div>
                        <div className="flex-none gap-2">

                            <div className="dropdown dropdown-end flex items-center gap-3">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ">
                                        <img className='rounded-full w-6 h-6 md:w-10 md:h-10 mr-3' src={user?.photoURL} alt="User image" />

                                    </div>
                                </label>
                                <div>
                                    <p className='text-black'>{user?.displayName}</p>
                                    {/* todo make it dynamic */}
                                    <p className='text-xs'>{currentUser?.role ? currentUser?.role : 'Student'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="mt-16 btn btn-error drawer-button lg:hidden">Open Menu</label>

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
                            currentUser?.role === 'Admin' && <>
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
                            currentUser?.role === 'Instructor' && <>
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
                            !currentUser?.role &&
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