import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Logout from './components/Logout';
import Test from './components/Test';
import { useDispatch, useSelector } from 'react-redux';
import Spend from './components/Spend';
import { useEffect } from 'react';
import { setLogged } from './store';

function App() {
  const logged = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogged());
  })

  return (
    <BrowserRouter>
      <div style={{display : "flex"}}>
          <Link to="/">Home</Link> &nbsp;&nbsp;
          <Link to="/test">Test</Link> &nbsp;&nbsp;
          {
            logged ? 
            <div style={{display : "flex"}}>
              <Link to="/logout">Logout</Link> &nbsp;&nbsp;
              <Link to="/spend">지출</Link>
            </div> :
            <Link to="/login">Login</Link>
          }

          
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/test' element={<Test />} />
        <Route path='/spend' element={<Spend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
