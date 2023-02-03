import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <h1>hello world</h1>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
