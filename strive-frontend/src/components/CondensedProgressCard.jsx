// CondensedProgressCard.jsx

const CondensedProgressCard = ({ totalWorkouts, totalExercises, totalDuration, totalSets, totalWeight, totalReps }) => {
  return (
    <div className="bg-[#8D99AE] p-6 rounded-2xl shadow-lg text-center md:hidden">
      <h2 className="text-[#EDF2F4] text-2xl font-semibold mb-4">
        Workout Summary
      </h2>
      <div className="text-[#EDF2F4] space-y-2">
        <p>Total Workouts - <span className="text-[#EF233C] font-bold">{totalWorkouts}</span></p>
        <p>Total Exercises - <span className="text-[#EF233C] font-bold">{totalExercises}</span></p>
        <p>Total Duration - <span className="text-[#EF233C] font-bold">{totalDuration} min</span></p>
        <p>Total Sets - <span className="text-[#EF233C] font-bold">{totalSets}</span></p>
        <p>Total Weight - <span className="text-[#EF233C] font-bold">{totalWeight} kg</span></p>
        <p>Total Reps - <span className="text-[#EF233C] font-bold">{totalReps}</span></p>
      </div>
    </div>
  );
};

// Export
export default CondensedProgressCard;
