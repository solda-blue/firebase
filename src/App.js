import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Logout from './components/Logout';
import Test from './components/Test';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Link to="/">Home</Link> &nbsp;&nbsp;
          <Link to="/login">Login</Link> &nbsp;&nbsp;
          <Link to="/test">Test</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
