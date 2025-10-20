import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import MainScreen from './Components/MainScreen/MainScreen.jsx';
import GiveRent from './Components/GiveRent/GiveRent.jsx';
import User from './Components/User/User.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/GiveRent' element={<GiveRent />} />
        <Route path='/user' element={<User/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
