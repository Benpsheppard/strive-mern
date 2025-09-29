// Progress.jsx
// File to hold Progress page layout and functionality

// Imports
import Header from '../components/Header.jsx';  // Import header component
import Spinner from '../components/Spinner.jsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWorkouts, reset } from '../features/workouts/workoutsSlice.js';


const Progress = () => {
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

    // Calculate stats
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);

    let totalWeight = 0;
    let totalReps = 0;
    let totalSets = 0;
    let totalExercises = 0;
    let heaviestLift = 0;

    workouts.forEach((w) => {
        w.exercises.forEach((ex) => {
            totalExercises++; // count exercises

            ex.sets.forEach((set) => {
                const weight = Number(set.weight) || 0;
                const reps = Number(set.reps) || 0;

                totalWeight += weight * reps;
                totalReps += reps;
                totalSets++;

                if (weight > heaviestLift) {
                    heaviestLift = weight;
                }
            });
        });
    });

    if(isLoading){
        return (
            <Spinner />
        )
    }

    const progressCard = "bg-[#8D99AE] p-6 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105";

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#2B2D42] px-6 py-12 mt-15">
                <h1 className="text-[#EDF2F4] text-5xl font-semibold text-center mb-8">
                    Progress <span className="text-[#EF233C]">Summary</span>
                </h1>

                {/* Summary grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card */}
                    <div className={progressCard}>
                        <h2 className="text-[#EDF2F4] text-xl">Total Workouts</h2>
                        <p className="text-[#EF233C] text-2xl font-bold">{totalWorkouts}</p>
                    </div>

                    <div className={progressCard}>
                        <h2 className="text-[#EDF2F4] text-xl">Total Exercises</h2>
                        <p className="text-[#EF233C] text-2xl font-bold">{totalExercises}</p>
                    </div>

                    <div className={progressCard}>
                        <h2 className="text-[#EDF2F4] text-xl">Total Duration</h2>
                        <p className="text-[#EF233C] text-2xl font-bold">{totalDuration} min</p>
                    </div>

                    <div className={progressCard}>
                        <h2 className="text-[#EDF2F4] text-xl">Total Sets</h2>
                        <p className="text-[#EF233C] text-2xl font-bold">{totalSets} min</p>
                    </div>

                    <div className={progressCard}>
                        <h2 className="text-[#EDF2F4] text-xl">Total Weight Lifted</h2>
                        <p className="text-[#EF233C] text-2xl font-bold">{totalWeight} kg</p>
                    </div>

                    <div className={progressCard}>
                        <h2 className="text-[#EDF2F4] text-xl">Total Reps</h2>
                        <p className="text-[#EF233C] text-2xl font-bold">{totalReps}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

// Export Progress
export default Progress;