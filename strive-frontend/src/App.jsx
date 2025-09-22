// App.jsx
// File to hold main app structure and functionality

// Imports
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';   // Import router functions
import { ToastContainer } from 'react-toastify';  // Import toast container
import 'react-toastify/dist/ReactToastify.css';   // Import toast css
import Dashboard from './pages/Dashboard.jsx';    // Import Dashboard page
import Login from './pages/Login.jsx';    // Import Login page
import Register from './pages/Register.jsx';    // Import Register page
import NewWorkout from './pages/NewWorkout.jsx';    // Import New Workout page
import PrevWorkouts from './pages/PrevWorkouts.jsx';    // Import Previous Workouts page
import Progress from './pages/Progress.jsx';    // Import Progress page
import Contact from './pages/Contact.jsx';    // Import Contact page

// App
const App = () => {

  // Visuals
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-workout' element={<NewWorkout />} />
            <Route path='/prev-workouts' element={<PrevWorkouts />} />
            <Route path='/progress' element={<Progress />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
};

export default App;