import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Faculty from './pages/Faculty';
import Coursedetails from './pages/Coursedetails';
import Attendance from './pages/Attendance';
import Studentdetail from './pages/Studentdetail';
import Sign from './pages/Sign';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/studentdetails" element={<Studentdetail />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/coursedetail" element={<Coursedetails />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
