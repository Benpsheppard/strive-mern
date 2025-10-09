// SetList.jsx

// Imports
import { motion, AnimatePresence } from 'framer-motion';

const SetList = ({ sets }) => {
    if (!sets || sets.length === 0) {
        return null;
    }

    return (
        <AnimatePresence>
            <ul className="flex flex-wrap justify-center gap-2 mb-2">
                {sets.map((s, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#2B2D42] text-[#EDF2F4] border border-[#EDF2F4]/30 rounded-full px-3 py-1 text-sm shadow-sm">
                    <span className="text-[#EF233C] font-semibold">{s.weight} kg</span> × {s.reps} reps
                </motion.li>
                ))}
            </ul>
        </AnimatePresence>
    )
};

// Export
export default SetList;