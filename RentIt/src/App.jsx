import Header from './Components/Header/Header.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
