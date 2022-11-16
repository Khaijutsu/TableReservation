import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './Layout';
import Registration from './components/Registration/Registration';
import Register from './components/Signup/SignUp';
import Confirmation from './components/Confirmation/Confirmation';





const App = () => {
  return (
  <BrowserRouter>   
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register-user" element={<Register/>}/>
      <Route path="/" element={<Layout />}>
        <Route path="/reserve-table" element={<Registration/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
    
  )
}

export default App