import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Layout';
import Registration from './Pages/Registration/Registration';
import Signup from './Pages/Signup/SignUp';
import Login from './Pages/Login/Login';
import Confirmation from './Pages/Confirmation/Confirmation';





const App = () => {
  return (
  <BrowserRouter>   
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/" element={<Layout />}>
        <Route path="/register-user" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reserve-table" element={<Registration/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
    
  )
}

export default App