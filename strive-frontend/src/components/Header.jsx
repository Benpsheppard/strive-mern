// Header.jsx

// Imports
import { Link } from 'react-router-dom';

const Header = () => {
    // Navigation options styling
    const navOps = "text-[#EDF2F4] hover:text-[#EF233C] inline-block transform transition duration-200 hover:scale-110";

    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    return (
        <header className="header fixed top-0 left-0 w-full bg-[#2B2D42] backdrop-blur-md text-[#EDF2F4] shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-100 h-15">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                
                {/* Logo / Title */}
                <div className="text-2xl font-bold tracking-wide">
                    <Link to="/" className={navOps}>
                        STRIVE
                    </Link>
                </div>

                {/* Navbar */}
                <nav>
                    <ul className="flex space-x-6 text-lg">
                        <li>
                            <Link to="/new-workout" className={navOps}>
                                New Workout
                            </Link>
                        </li>
                        <li>
                            <Link to="/prev-workouts" className={navOps}>
                                Previous Workouts
                            </Link>
                        </li>
                        <li>
                            <Link to="/progress" className={navOps}>
                                Progress
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={navOps}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Link to='/profile' className="text-[#EF233C] hover:text-[#D90429] inline-block transform transition duration-200 hover:scale-110">
                                    {user.username}
                                </Link>
                            ) : (
                                <Link to='/login' className={navOps}>
                                    Sign in
                                </Link>)}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

// Export Header
export default Header;