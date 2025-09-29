// Dashboard.jsx
// File to hold Dashboard page layout and functionality

// Imports
import Header from '../components/Header.jsx';  // Import header component
import Hero from '../components/Hero.jsx';  // Import hero component
import About from '../components/About.jsx';    // Import about component
import Features from '../components/Features.jsx';  // Import Features component
import Footer from '../components/Footer.jsx';
import Spinner from '../components/Spinner.jsx';
import { useSelector } from 'react-redux';

// Dashboard
const Dashboard = () => {
    const { isLoading } = useSelector((state) => state.auth);

    if(isLoading){
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Header />
            <Hero />
            <About />
            <Features />
            <Footer />
        </>
    )
};

// Export Dashboard
export default Dashboard;