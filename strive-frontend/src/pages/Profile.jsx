// Profile.jsx

// Imports
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice.js';
import Header from '../components/Header.jsx';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner.jsx';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    useEffect(() => {
            if (isError) {
                console.log(message);
            }
    
            if (!user){
                navigate('/login');
                return;
            }
        
            return () => {
                dispatch(reset());
            }
    
        }, [user, isError, message, navigate, dispatch]);

    if(isLoading || !user){
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Header />
            <div className="container bg-[#2B2D42] min-h-screen mx-auto px-6 py-10">
                <h1 className="text-3xl text-center mt-25 font-bold text-[#EDF2F4] mb-6">
                    Profile
                </h1>

                <div className="bg-[#8D99AE] mx-auto item-center text-center shadow-md rounded-xl p-6 max-w-md">
                    <FaUser className="text-8xl text-[#2B2D42] bg-[#EDF2F4] rounded-full mx-auto mb-3"/>
                    <p className="text-lg mb-2 text-[#2B2D42]">
                        <span className="font-semibold">Username:</span> {user.username}
                    </p>
                    <p className="text-lg mb-2 text-[#2B2D42]">
                        <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="text-lg mb-6 text-[#2B2D42]">
                        <span className="font-semibold">User since:</span>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <button onClick={onLogout} className="bg-[#EF233C] text-white px-4 py-2 rounded-lg hover:bg-[#D90429] transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
