import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from './state/User';
import Login from './screen/login/Login';
import Main from './screen/main/Main';
import './App.css';

const App = () => {

  const [user, setUser] = useRecoilState(User);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path='/'           
            element={
              user.token.length === 0
              ?
              <Login />
              :
              <Main />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
