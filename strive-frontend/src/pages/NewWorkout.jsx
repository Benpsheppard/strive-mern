// NewWorkout

// Imports
import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import WorkoutItem from '../components/WorkoutItem.jsx';
import Spinner from '../components/Spinner.jsx';
import { FaPlus } from 'react-icons/fa';
import { createWorkout, getWorkouts, reset } from '../features/workouts/workoutsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//New Workout
const NewWorkout = () => {
    // Get current user
    const { user } = useSelector((state) => state.auth);

    // Get most recent workout
    const { workouts, isLoading, isError, message } = useSelector((state) => state.workout);
    const lastWorkout = workouts.length > 0 ? workouts[workouts.length - 1] : null;

    // Taglines
    const taglines = [
        "Consistency builds strength",
        "One more rep, one step closer",
        "No excuses, just results",
        "Push your limits",
        "Strive for progress, not perfection"
    ];
    const [tagline, setTagline] = useState('');

    // Initialise navigate and dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Set initial state of input fields
    const [title, setTitle] = useState('');
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState({
        name: '',
        musclegroup: '',
        description: '',
        sets: []
    });
    const [currentSet, setCurrentSet] = useState({ weight: '', reps: '' });
    const [started, setStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);

    // Change input for exercise fields
    const handleExerciseChange = (e) => {
        setCurrentExercise(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Change input for set fields
    const handleSetChange = (e) => {
        setCurrentSet(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Add set to current exercise
    const addSet = () => {
        if (!currentSet.weight || !currentSet.reps) return;
        setCurrentExercise(prev => ({
            ...prev,
            sets: [...prev.sets, { weight: Number(currentSet.weight), reps: Number(currentSet.reps) }]
        }));
        setCurrentSet({ weight: '', reps: '' });
    };

    // Add exercise to workout
    const addExercise = () => {
        if (!currentExercise.name || currentExercise.sets.length === 0) return;
        setExercises(prev => [...prev, currentExercise]);
        setCurrentExercise({ name: '', musclegroup: '', description: '', sets: [] });
    };

    // Submit workout
    const onSubmit = () => {
        const endTime = Date.now();
        const durationMinutes = Math.round((endTime - startTime) / 60000); // duration in minutes

        const workoutData = { title, exercises, duration: durationMinutes };
        dispatch(createWorkout(workoutData));

        // Reset
        setTitle('');
        setExercises([]);
        setCurrentExercise({ name: '', musclegroup: '', description: '', sets: [] });
        setCurrentSet({ weight: '', reps: '' });
        setStarted(false);
        setStartTime(null);
    };

    // Start workout
    const startWorkout = () => {
        setStarted(true);
        setStartTime(Date.now());
    };

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user){
            navigate('/login');
            return;
        }

        dispatch(getWorkouts());

        // Cycle through taglines
        let index = 0;
        setTagline(taglines[index]);
        const interval = setInterval(() => {
            index = (index + 1) % taglines.length;
            setTagline(taglines[index]);
        }, 4000);

        return () => {
            clearInterval(interval)
            dispatch(reset());
        }
    }, [user, message, isError, navigate, dispatch]);

    if(isLoading || !user){
        return (
            <Spinner />
        )
    }

    return (
        <section className="bg-[#2B2D42] min-h-screen flex flex-col items-center justify-center">
            <Header />
            <section>
                {!started && (
                    <div>
                        <div className="text-6xl text-[#EDF2F4]">
                            <h1>Welcome back, <span className="text-[#EF233C]">{user.username}</span></h1>
                            <p className="text-lg italic text-[#EDF2F4] text-center mb-6 transition-opacity duration-500">
                                {tagline}
                            </p>
                        </div>
                        {lastWorkout && (
                        <div>
                            <h2 className="text-[#EDF2F4] text-center text-xl mt-10">Last Session</h2>
                            <WorkoutItem workout={lastWorkout} />
                        </div>
                        )}
                    </div>
                )}

                <div className="p-4 max-w-full sm:max-w-lg mx-4 sm:mx-auto mt-10 bg-[#8D99AE] shadow rounded-2xl mt-20">
                    {!started ? (
                        <>
                            <h2 className="text-[#EDF2F4] text-xl text-center mb-3">
                                Ready to train?
                            </h2>
                            <button onClick={startWorkout} className="w-full bg-[#EF233C] text-[#EDF2F4] py-2 px-4 rounded-xl hover:bg-[#D90429]">
                                Start Workout
                            </button>
                        </>
                    ) : (
                    <>
                        <h1 className="new-workout text-2xl sm:text-3xl text-center text-[#EDF2F4] mb-5">
                             - New <span className="text-[#EF233C]">Workout</span> -
                        </h1>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Workout Title"
                            className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 mb-3 text-[#EDF2F4] text-center placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                        />

                        {/* Exercise Form */}
                        <div className="mb-4 bg-[#8D99AE] p-4 rounded-xl shadow-xl">
                            <input
                                type="text"
                                name="name"
                                value={currentExercise.name}
                                onChange={handleExerciseChange}
                                placeholder="Exercise Name"
                                className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 mb-3 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                            />
                            <input
                                type="text"
                                name="musclegroup"
                                value={currentExercise.musclegroup}
                                onChange={handleExerciseChange}
                                placeholder="Muscle Group"
                                className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 mb-3 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                            />
                            <input
                                type="text"
                                name="description"
                                value={currentExercise.description}
                                onChange={handleExerciseChange}
                                placeholder="Description"
                                className="w-full rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 mb-3 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                            />

                            {/* Sets Form */}
                            <div className="flex flex-col sm:flex-row gap-2 mb-2">
                                <input
                                    type="number"
                                    name="weight"
                                    value={currentSet.weight}
                                    onChange={handleSetChange}
                                    placeholder="Weight"
                                    className="flex-1 w-45 rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 mb-3 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                                />
                                <input
                                    type="number"
                                    name="reps"
                                    value={currentSet.reps}
                                    onChange={handleSetChange}
                                    placeholder="Reps"
                                    className=" flex-1 w-45 rounded-lg border border-[#EDF2F4]/40 bg-[#2B2D42] px-4 py-2 mb-3 text-[#EDF2F4] placeholder-gray-300 focus:border-[#EF233C] focus:outline-none focus:ring-2 focus:ring-[#EF233C]/40"
                                />
                                <button type="button" onClick={addSet} className="sm:w-auto w-full bg-[#EF233C] text-white px-2 py-2 mx-auto mb-3 rounded-full transition hover:bg-[#D90429]">
                                    <FaPlus />
                                </button>
                            </div>

                            {/* Current sets */}
                            <ul className="mb-2">
                                {currentExercise.sets.map((s, i) => (
                                <li key={i}>{s.weight} kg × {s.reps} reps</li>
                                ))}
                            </ul>

                            <button type="button" onClick={addExercise} className="bg-[#EF233C] w-full text-white px-4 py-2 rounded transition hover:bg-[#D90429]">
                                Add Exercise
                            </button>
                        </div>

                        {/* Exercises List */}
                        <div className="max-h-64 overflow-y-auto mb-4">
                            {exercises.map((ex, i) => (
                            <div key={i} className="bg-[#8D99AE] p-2 rounded-lg mb-2 text-center shadow-lg">
                                <h4 className="font-bold text-[#EF233C]">{ex.name}</h4>
                                <p className="text-[#EDF2F4]">{ex.musclegroup} — {ex.description}</p>
                                <ul>
                                    {ex.sets.map((s, idx) => (
                                    <li className="text-[#2B2D42]"key={idx}> - {s.weight} kg × {s.reps} reps</li>
                                    ))}
                                </ul>
                            </div>
                            ))}
                        </div>

                        <button onClick={onSubmit} className="w-full bg-[#EF233C] text-white py-2 rounded mt-4 transition hover:bg-[#D90429]">
                            End Workout
                        </button>
                    </>
                    )}
                </div>
            </section>
        </section>
    )
};

// Export
export default NewWorkout;