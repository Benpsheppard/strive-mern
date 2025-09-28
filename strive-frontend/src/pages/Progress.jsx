// Progress.jsx
// File to hold Progress page layout and functionality

// Imports
import Header from '../components/Header.jsx';  // Import header component
import Spinner from '../components/Spinner.jsx';
import { useSelector } from 'react-redux';


const Progress = () => {
    const { isLoading } = useSelector((state) => state.auth);

    if(isLoading){
        return (
            <Spinner />
        )
    }
    
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#2B2D42] mt-15">
                <h1 className="text-[#EDF2F4] text-center text-3xl pt-20">Progress reports coming Soon...</h1>
            </div>
        </>
    )
};

// Export Progress
export default Progress;