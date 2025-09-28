// PrevWorkouts.jsx
// File to hold PrevWorkouts page layout and functionality

// Imports 
import Header from '../components/Header.jsx';  // Import header
import WorkoutItem from '../components/WorkoutItem.jsx';    // Import workout items
import Spinner from '../components/Spinner.jsx' // Import spinner
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWorkouts, reset } from '../features/workouts/workoutsSlice.js';
import { Link } from 'react-router-dom';

// PrevWorkouts
const PrevWorkouts = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { workouts, isLoading, isError, message } = useSelector((state) => state.workout);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user){
            navigate('/login');
        }

        dispatch(getWorkouts());

        return () => {
            dispatch(reset());
        }

    }, [user, isError, message, navigate, dispatch]);

    if(isLoading){
        return (
            <Spinner />
        )
    }

    return (
        <section className="bg-[#2B2D42] min-h-screen flex flex-col items-center justify-center">
            <Header />
            <section className="mt-15 text-6xl text-[#EDF2F4] text-center px-4 py-4">
                <h1>Your Completed Workouts</h1>
            </section>

            <section className="workout-content">
                {workouts.length > 0 ? 
                (
                    <div>
                        {workouts.map((workout) => (
                            <WorkoutItem key={workout._id} workout={workout} />
                        ))}
                    </div>
                ) : (
                    <div className="text-[#EDF2F4] text-xl text-center mt-10">
                        <h3>You have not completed any workouts!</h3>
                        <button className="rounded-lg bg-[#EF233C] px-4 py-2 mt-10 font-semibold text-[#EDF2F4] transition hover:bg-[#D90429]">
                            <Link to='/new-workout'>
                                New Workout 
                            </Link>
                        </button>
                    </div>
                )}
            </section>
        </section>
    )
};

// Export PrevWorkouts
export default PrevWorkouts;