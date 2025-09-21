// Register.jsx
// File to hold Register page layout and functionality

// Imports
import { Link } from 'react-router-dom';

// Register
const Register = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#2B2D42] px-4">
            <div className="w-full max-w-md rounded-2xl bg-[#8D99AE] p-8 shadow-lg">
                
                {/* Title */}
                <h1 className="mb-6 text-center text-3xl font-bold text-[#EDF2F4]">
                    Welcome to <span className="text-[#EF233C]">Strive</span>
                </h1>

                {/* Form */}
                <form className="space-y-4">
                    <h2 className="mb-2 text-center text-xl font-semibold text-[#EDF2F4]">
                        - Register -
                    </h2>

                    <input
                        type="email"
                        id="email"
                        required
                        placeholder="Email@gmail.com"
                        className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                    />

                    <input
                        type="text"
                        id="username"
                        required
                        placeholder="Username"
                        className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                    />

                    <input
                        type="password"
                        id="password"
                        required
                        placeholder="Password"
                        className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                    />

                    <p className="text-center text-sm text-[#EDF2F4]">
                        Already have an account?
                        <Link to="/login" className="text-[#EF233C] hover:text-[#D90429] hover:underline">
                             Login Here
                        </Link>
                    </p>

                    <button id="RegisterBtn" type="submit" className="w-full rounded-lg bg-[#EF233C] px-4 py-2 font-semibold text-[#EDF2F4] transition hover:bg-[#D90429]">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
};

// Export Register
export default Register;