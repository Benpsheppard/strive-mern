import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PBChart = ({ workouts }) => {
    const exercisePBs = {};

    // Collect personal bests
    workouts.forEach((workout) => {
        const workoutDate = workout.date || workout.createdAt || 'Unknown date';

        workout.exercises.forEach((exercise) => {
            const name = exercise.name;
            exercise.sets.forEach((set) => {
                const weight = Number(set.weight) || 0;
                if (!exercisePBs[name] || weight > exercisePBs[name].weight) {
                    exercisePBs[name] = { weight, date: workoutDate };
                }
            });
        });
    });

    // Prepare data for chart
    const labels = Object.keys(exercisePBs);
    const weights = labels.map((name) => exercisePBs[name].weight);
    const dates = labels.map((name) => exercisePBs[name].date);

    // Chart data
    const data = {
        labels,
        datasets: [
        {
            label: 'Personal Best (kg)',
            data: weights,
            backgroundColor: '#EF233C'
        },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const index = context.dataIndex;
                        const weight = context.formattedValue;
                        const date = dates[index];
                        return ` ${weight} kg (on ${new Date(date).toLocaleDateString()})`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#EDF2F4' },
                grid: { color: 'rgba(237, 242, 244, 0.3)' },
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#EDF2F4' },
                grid: { color: 'rgba(237, 242, 244, 0.3)' },
                title: {
                    display: true,
                    text: 'Weight (kg)',
                    color: '#EDF2F4',
                },
            },
        },
    };

    // Handle case with no exercises
    if (labels.length === 0) {
        return (
        <div className="bg-[#8D99AE] p-6 rounded-2xl mt-10 text-center text-[#EDF2F4]">
            <p>No exercises found</p>
        </div>
        );
    }

    return (
        <div className="bg-[#8D99AE] p-6 rounded-2xl mt-10">
            <h2 className="text-[#EDF2F4] text-2xl font-semibold mb-4 text-center">Personal Bests</h2>
            <div className="h-[300px] md:h-[400px] relative">
                <Bar data={data} options={options} />
            </div>
        </div>

    );
};

export default PBChart;
