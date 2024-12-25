import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from './components/studentsForm';
import  { Toaster } from 'react-hot-toast';
import NoPage from './NoPage';
function App() {
  return (
    <div className="App">
<Toaster/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/students" element={<Students />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
