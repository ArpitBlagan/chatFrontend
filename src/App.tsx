import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import {Toaster} from 'react-hot-toast'
import './App.css'
import Home from './components/Home';
import Navbar from './components/Navbar';
import ContextP from "./ContextP";
function App() {

  return (
    <Router>
      <ContextP>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </ContextP>
    </Router>
  )
}

export default App
