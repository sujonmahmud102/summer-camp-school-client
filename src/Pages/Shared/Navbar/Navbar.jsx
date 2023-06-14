import React, { useContext } from 'react';
import logo from '../../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';


const Navbar = () => {
    const { user, logOut } = useAuth();


    // handle LogOUt
    const handleLogOUt = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const navItems = <>
        <li className='mr-4'>
            <NavLink
                to='/'
                className={({ isActive }) => isActive ? "font-bold text-error" : ""}
            >Home
            </NavLink>
        </li>
        <li className='mr-4'>
            <NavLink
                to='/instructors'
                className={({ isActive }) => isActive ? "font-bold text-error" : ""}
            >Instructors
            </NavLink>
        </li>
        <li className='mr-4'>
            <NavLink
                to='/classes'
                className={({ isActive }) => isActive ? "font-bold text-error" : ""}
            >Classes
            </NavLink>
        </li>
        <li className='mr-4'>
            {user ?
                <NavLink
                    to='/dashboard/'
                    className={({ isActive }) => isActive ? "font-bold text-error" : ""}
                >Dashboard
                </NavLink> :
                <></>
            }
        </li>
        <li className='mr-4'>
            {!user ?
                <NavLink
                    to='/register'
                    className={({ isActive }) => isActive ? "font-bold text-error" : ""}
                >Register
                </NavLink> :
                <></>
            }
        </li>
    </>

    return (
        <div className="sticky top-0 z-50 navbar bg-[rgb(11,6,51)]">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow text-white rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl"><img className='w-24' src={logo} alt="" /> </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user ? <>
                        <div className="tooltip tooltip-left" data-tip={user?.displayName}>
                            <img className='rounded-full w-6 h-6 md:w-10 md:h-10 mr-3' src={user?.photoURL} alt="User image" />
                        </div>
                        <button onClick={handleLogOUt} className='btn btn-md'>Logout</button>
                    </> :
                        <Link to='/login'>
                            <button className='btn btn-md btn-error'>Login</button>
                        </Link>
                }
            </div>

        </div>
    );
};

export default Navbar;