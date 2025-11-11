import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import MainScreen from './Components/MainScreen/MainScreen.jsx';
import GiveRent from './Components/GiveRent/GiveRent.jsx';
import User from './Components/User/User.jsx';
import Product from './Components/Product/Product.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/GiveRent' element={<GiveRent />} />
        <Route path='/user' element={<User/>} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
