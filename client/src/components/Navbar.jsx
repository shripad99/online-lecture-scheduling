import React from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = ({userInfo}) => {
    const navigate = useNavigate();

    const onLogout = () =>{
        localStorage.clear();
        navigate("/");
    }
    
    return (
        <nav className="bg-green-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-5 ">
                <div className="flex justify-between items-center">
                    <div className="cursor-pointer">
                        <h1 className="text-xl font-medium">
                            Elearning
                        </h1>
                    </div>
                    <div className="hidden md:flex space-x-1 gap-8 items-center">
                        <a className="text-white cursor-pointer">
                            Home
                        </a>
                        <a className="text-white cursor-pointer">
                            Work
                        </a>
                        <a className="text-white cursor-pointer">
                            About
                        </a>
                        {userInfo ? (
                            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                        ) : (
                            <a
                                href="/login"
                                className="px-7 py-2 bg-white rounded-full text-green-600 outline-none"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/');
                                }}
                            >
                                Login
                            </a>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button className="transition-transform duration-300 hover:scale-110">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar