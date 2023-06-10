import logo from '../../../public/logo.png'
import { FaClipboardList, FaHome, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';

const Dashboard = () => {
    const { user } = useAuth();

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
                                    <p className='text-xs'>Admin</p>
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
                        <li>
                            <NavLink
                                to='/dashboard/'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaHome></FaHome> Admin Home
                            </NavLink>
                        </li>
                        <li><a><FaClipboardList></FaClipboardList> Manage Classes</a></li>
                        <li>
                            <NavLink
                                to='/dashboard/manageUsers'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaUsers></FaUsers> Manage Users
                            </NavLink>
                        </li>



                        <hr className="border border-white my-10" />

                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaHome></FaHome> Home
                            </NavLink>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;