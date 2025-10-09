// Progress.jsx
// File to hold Progress page layout and functionality

// Imports
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWorkouts, reset } from '../features/workouts/workoutsSlice.js';
import Header from '../components/Header.jsx';
import Spinner from '../components/Spinner.jsx';
import PBChart from '../components/PBChart.jsx';
import ProgressCard from '../components/ProgressCard.jsx';
import MobileProgressCard from '../components/CondensedProgressCard.jsx';
import ExerciseProgressChart from '../components/ExerciseProgressChart.jsx';

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
            return;
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

    if(isLoading || !user){
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#2B2D42] px-6 py-12 mt-15">
                <h1 className="text-[#EDF2F4] text-5xl font-semibold text-center mb-8">
                    Progress <span className="text-[#EF233C]">Summary</span>
                </h1>

                {/* Summary grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <ProgressCard title="Total Workouts" value={totalWorkouts} />
                <ProgressCard title="Total Exercises" value={totalExercises} />
                <ProgressCard title="Total Duration" value={`${totalDuration} min`} />
                <ProgressCard title="Total Sets" value={totalSets} />
                <ProgressCard title="Total Weight Lifted" value={`${totalWeight} kg`} />
                <ProgressCard title="Total Reps" value={totalReps} />
                </div>

                {/* Mobile Summary card */}
                <MobileProgressCard
                    totalWorkouts={totalWorkouts}
                    totalExercises={totalExercises}
                    totalDuration={totalDuration}
                    totalSets={totalSets}
                    totalWeight={totalWeight}
                    totalReps={totalReps}
                />
                
                {/* Charts Section */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PBChart workouts={workouts} />
                    <ExerciseProgressChart workouts={workouts} />
                </div>

            </div>
        </>
    )
};

// Export Progress
export default Progress;