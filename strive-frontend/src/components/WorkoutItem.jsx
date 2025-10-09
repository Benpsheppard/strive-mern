import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkout, getWorkouts } from '../features/workouts/workoutsSlice.js';
import { FaTimes } from 'react-icons/fa';

const WorkoutItem = ({ workout }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this workout?")) {
        dispatch(deleteWorkout(workout._id));
        }
    };

    const handleExpand = (e) => {
        e.stopPropagation();
        handleDelete();
    };

    const exerciseCount = workout.exercises?.length || 0;

    return (
        <div className={`relative bg-[#8D99AE] rounded-xl shadow-md p-4 mb-4 flex flex-col gap-2 max-w-200 mx-auto cursor-pointer transition-all duration-300 ${expanded ? "max-h-[600px]" : "max-h-[120px] overflow-hidden"}`}
            onClick={() => setExpanded(!expanded)}>
            {/* X delete button in top right */}
            <button onClick={handleExpand} className="absolute top-2 right-2 text-[#EF233C] hover:text-[#D90429] text-lg font-bold" aria-label="Delete workout">
                <FaTimes />
            </button>

            {/* Header: Title + Date */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#EDF2F4]">{workout.title}</h2>
                <span className="text-sm text-[#2B2D42]">
                    {new Date(workout.createdAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>

            {/* Summary info */}
            <p className="text-sm text-[#2B2D42]">
                Duration: <span className="font-medium">{workout.duration || 0} mins</span> 
                {" | "}
                {exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"}
            </p>


            {/* Expanded content */}
            {expanded && (
                <>
                {exerciseCount > 0 && (
                    <div className="mt-2">
                        <h3 className="text-sm font-semibold text-[#EDF2F4] mb-1">Exercises</h3>
                        <ul className="space-y-1">
                            {workout.exercises.map((ex, index) => (
                            <li
                                key={index}
                                className="flex justify-between text-sm text-[#2B2D42]"
                            >
                                <span>
                                {ex.name} ({ex.musclegroup})
                                </span>
                                <span>
                                {ex.sets?.length ? `${ex.sets.length} sets` : "No sets"}
                                </span>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default WorkoutItem;
