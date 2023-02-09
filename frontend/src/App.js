import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Main from './components/Main';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/auth'></Navigate>}></Route>
          <Route path='/main' element={<Navigate to='/main/home'></Navigate>}></Route>
          <Route path='/main/*' element={<Main />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
