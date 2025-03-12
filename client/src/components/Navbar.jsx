import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="px-6 py-3 cursor-pointer">
                        <h1 className="text-xl font-medium">
                            Elearning
                        </h1>
                    </div>
                    <div className="hidden md:flex space-x-1">
                        <a className="px-6 py-3 text-gray-700 cursor-pointer">
                            Home
                        </a>
                        <a className="px-6 py-3 text-gray-700 cursor-pointer">
                            Work
                        </a>
                        <a className="px-6 py-3 text-gray-700 cursor-pointer">
                            About
                        </a>
                        <a href="/" className="px-6 py-3 text-gray-700 border rounded">
                            Login
                        </a>
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