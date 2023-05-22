import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Logout from './components/Logout';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Link to="/">Home</Link> &nbsp;&nbsp;
          <Link to="/login">Login</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
